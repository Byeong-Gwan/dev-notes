// Read-only Notion integration utilities
// Usage: fetchNotionEvents({ token, databaseId, propNames })

async function fetchNotionEvents({ token, databaseId, propNames = {} }) {
  // Lazy-require to avoid crashing if package not installed yet
  let Client;
  try {
    Client = require('@notionhq/client').Client;
  } catch (e) {
    const err = new Error('Notion SDK(@notionhq/client) is not installed');
    err.code = 'NOTION_SDK_MISSING';
    throw err;
  }
  const notion = new Client({ auth: token });

  const {
    title: TITLE = 'Name',
    date: DATE = 'Date',
    type: TYPE = 'Type',
    user: USER = 'User',
    reason: REASON = 'Reason',
    status: STATUS = 'Status',
  } = propNames;

  // Query latest pages, sorted by date desc if possible
  const resp = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      { property: DATE, direction: 'descending' }
    ],
    page_size: 100,
  });

  const mapTitle = (p) => {
    const t = p?.[TITLE]?.title || p?.[TITLE]?.rich_text;
    if (Array.isArray(t) && t.length) return t.map(x => x.plain_text).join('');
    // fallback to a common Notion title prop name
    const name = p?.Name?.title;
    if (Array.isArray(name) && name.length) return name.map(x => x.plain_text).join('');
    return '';
  };

  const mapDate = (p) => {
    const d = p?.[DATE]?.date || p?.Date?.date;
    if (!d) return { start: null, end: null };
    return { start: d.start || null, end: d.end || null };
  };

  const pickSelect = (p, key) => {
    const v = p?.[key]?.select || p?.[key]?.status;
    return v ? v.name : null;
  };

  const pickPeopleOrText = (p, key) => {
    const people = p?.[key]?.people;
    if (Array.isArray(people) && people.length) return people.map(u => u.name || u.id).join(', ');
    const text = p?.[key]?.rich_text;
    if (Array.isArray(text) && text.length) return text.map(x => x.plain_text).join('');
    const str = p?.[key]?.plain_text || p?.[key]?.url;
    return str || null;
  };

  const pickRichText = (p, key) => {
    const rt = p?.[key]?.rich_text;
    if (Array.isArray(rt) && rt.length) return rt.map(x => x.plain_text).join('\n');
    return null;
  };

  const items = resp.results.map(pg => {
    const props = pg.properties || {};
    const { start, end } = mapDate(props);
    return {
      id: pg.id,
      title: mapTitle(props) || 'Untitled',
      start,
      end,
      type: pickSelect(props, TYPE),
      user: pickPeopleOrText(props, USER),
      reason: pickRichText(props, REASON),
      status: pickSelect(props, STATUS),
      url: pg.url,
    };
  });

  return items;
}

module.exports = { fetchNotionEvents };
