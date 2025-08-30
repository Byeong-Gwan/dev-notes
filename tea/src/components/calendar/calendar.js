/**
 * 근무 신청 및 calendar 
 * 연차, 오전 반차, 오후 반차, MOD(재택)
 */

const API_BASE = '/api/requests';
let IS_ADMIN = false;

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let requests = [];
let currentEditingRange = null; // for range edit
let popup, confirmBtn, cancelBtn;

async function loadRequests() {
  try {
    const res = await fetch(`${API_BASE}?status=approved`, { credentials: 'include' });
    requests = await res.json();
  } catch (err) {
    console.error('데이터 불러오기 실패:', err);
  }
}

async function loadPopup() {
  const res = await fetch('./../components/calendar/calendarPopup.html');
  const html = await res.text();
  document.getElementById('popup-container').innerHTML = html;
  popup = document.querySelector('.popup-overlay');
  confirmBtn = popup.querySelector('#confirm');
  cancelBtn = popup.querySelector('#cancel');
  setupPopupEvents();
}

function renderWeekdays() {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  document.querySelector('.weekdays').innerHTML = weekdays.map(d => `<div>${d}</div>`).join('');
}

function groupByDate(data) {
  const grouped = {};
  data.forEach(r => {
    if (!grouped[r.date]) grouped[r.date] = {};
    if (!grouped[r.date][r.type]) grouped[r.date][r.type] = new Set();
    grouped[r.date][r.type].add(`${r.user}(${r.id})`); // id 포함시켜 삭제용으로 활용
  });
  return grouped;
}

// ===== Helpers for vacation (연차) range detection =====
function toDate(dstr) {
  const [y, m, d] = dstr.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function addDays(d, n) { const nd = new Date(d); nd.setDate(nd.getDate() + n); return nd; }

function buildVacationRanges(all) {
  // Build ranges per user for type '연차'
  const vac = all.filter(r => r.type === '연차');
  const byUser = new Map();
  vac.forEach(r => {
    if (!byUser.has(r.user)) byUser.set(r.user, []);
    byUser.get(r.user).push({ date: r.date, id: r.id, reason: r.reason || '' });
  });

  /** ranges: [{user, start, end, ids:[...], dates:[...] }] */
  const ranges = [];
  for (const [user, arr] of byUser.entries()) {
    arr.sort((a, b) => a.date.localeCompare(b.date));
    let i = 0;
    while (i < arr.length) {
      let start = arr[i];
      let end = arr[i];
      const ids = [start.id];
      const dates = [start.date];
      let j = i + 1;
      while (j < arr.length) {
        const prev = toDate(arr[j - 1].date);
        const cur = toDate(arr[j].date);
        const isConsecutive = fmtDate(addDays(prev, 1)) === fmtDate(cur);
        if (!isConsecutive) break;
        end = arr[j];
        ids.push(arr[j].id);
        dates.push(arr[j].date);
        j++;
      }
      ranges.push({ user, start: start.date, end: end.date, ids, dates });
      i = j;
    }
  }
  return ranges;
}

async function generateCalendar(year, month) {
  await loadRequests();

  document.getElementById('month-title').textContent = `${year}년 ${month + 1}월`;
  const calendarEl = document.getElementById('calendar');
  calendarEl.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarEl.innerHTML += `<div class="day prev-month"></div>`;
  }

  const grouped = groupByDate(requests);
  const vacRanges = buildVacationRanges(requests);
  // Fast lookup helpers
  const isVacDate = new Map(); // key: `${user}|${date}` -> true
  const vacStartByKey = new Map(); // key: `${user}|${start}` -> range
  const vacRangeByDateKey = new Map(); // key: `${user}|${date}` -> range containing that date
  vacRanges.forEach(r => {
    vacStartByKey.set(`${r.user}|${r.start}`, r);
    r.dates.forEach(d => {
      const key = `${r.user}|${d}`;
      isVacDate.set(key, true);
      vacRangeByDateKey.set(key, r);
    });
  });

  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const div = document.createElement('div');
    div.className = 'day';
    div.innerHTML = `<div class="day-number">${d}</div><div class="day-tags"></div>`;

    const tagContainer = div.querySelector('.day-tags');

    if (grouped[dateStr]) {
      // 1) Non-vacation types are rendered as-is
      Object.entries(grouped[dateStr]).forEach(([type, usersSet]) => {
        if (type !== '연차') {
          usersSet.forEach(userWithId => {
            const [user, id] = userWithId.split('(');
            const cleanId = id.replace(')', '');
            const tag = document.createElement('div');
            tag.className = `tag ${type}`;
            if (IS_ADMIN) {
              tag.innerHTML = `${type}: ${user} <span class="delete-btn">❌</span>`;
              tag.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTag(cleanId);
              });
            } else {
              tag.textContent = `${type}: ${user}`;
            }
            tagContainer.appendChild(tag);
          });
        }
      });

      // 2) Vacation: render as range
      // Find all users who have vacation that includes this date
      const usersOnDate = new Set();
      (grouped[dateStr]['연차'] || new Set()).forEach(userWithId => {
        const [user] = userWithId.split('(');
        usersOnDate.add(user);
      });
      usersOnDate.forEach(user => {
        const keyStart = `${user}|${dateStr}`;
        const inRange = isVacDate.get(keyStart);
        if (!inRange) return;
        // treat as start if true start, or previous day not part of the same range
        const prevDateStr = fmtDate(addDays(toDate(dateStr), -1));
        const prevInRange = isVacDate.get(`${user}|${prevDateStr}`);
        const isStart = vacStartByKey.has(keyStart) || !prevInRange;
        if (isStart) {
          const range = vacStartByKey.get(keyStart) || vacRangeByDateKey.get(keyStart);
          const label = (range.start === range.end)
            ? `연차: ${user}`
            : `연차: ${user} (${range.start} ~ ${range.end})`;
          const tag = document.createElement('div');
          tag.className = `tag 연차 vacation-start`;
          if (IS_ADMIN) {
            tag.innerHTML = `${label} <span class="delete-btn">❌</span>`;
            // Delete whole range
            tag.querySelector('.delete-btn').addEventListener('click', async (e) => {
              e.stopPropagation();
              await deleteRange(range);
            });
            // Double click to edit range
            tag.addEventListener('dblclick', (e) => {
              e.stopPropagation();
              currentEditingRange = range;
              openPopup('range-edit', range.start);
              // Prefill
              popup.querySelector('#popup-start-date').value = range.start;
              popup.querySelector('#popup-end-date').value = range.end;
              popup.querySelector('#user').value = user.trim();
              popup.querySelectorAll('input[name="type"]').forEach(i => i.checked = (i.value === '연차'));
            });
          } else {
            tag.textContent = label;
          }
          tagContainer.appendChild(tag);
        } else {
          // Continuation marker
          const cont = document.createElement('div');
          cont.className = 'tag 연차 vacation-cont';
          cont.textContent = '연차';
          tagContainer.appendChild(cont);
        }
      });
    }

    if (IS_ADMIN) {
      div.addEventListener('click', () => openPopup('single', dateStr));
    }
    calendarEl.appendChild(div);
  }
}

function openPopup(mode, dateStr) {
  popup.style.display = 'flex';
  popup.dataset.mode = mode;
  popup.dataset.date = dateStr;
  popup.querySelector('#popup-date').textContent = `${dateStr} 신청`;
  popup.querySelector('#popup-start-date').value = dateStr;
  popup.querySelector('#popup-end-date').value = dateStr;
  popup.querySelector('#user').value = '';
  popup.querySelector('#reason').value = '';
  popup.querySelectorAll('input[name="type"]').forEach(i => i.checked = false);
}

function setupPopupEvents() {
  confirmBtn.onclick = async () => {
    const type = popup.querySelector('input[name="type"]:checked')?.value;
    const user = popup.querySelector('#user').value.trim();
    const reason = popup.querySelector('#reason').value.trim();
    const start = new Date(popup.querySelector('#popup-start-date').value);
    const end = new Date(popup.querySelector('#popup-end-date').value);

    if (!type || !user || start > end) {
      alert('모든 항목을 올바르게 입력하세요.');
      return;
    }

    // Range edit: delete old then recreate
    if (popup.dataset.mode === 'range-edit' && currentEditingRange) {
      await deleteRange(currentEditingRange);
      currentEditingRange = null;
    }

    let day = new Date(start);
    while (day <= end) {
      const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
      try {
        await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: dateStr, type, user, reason })
        });
      } catch (err) { console.error('신청 실패:', err); }
      day.setDate(day.getDate() + 1);
    }

    popup.style.display = 'none';
    generateCalendar(currentYear, currentMonth);
  };

  cancelBtn.onclick = () => {
    popup.style.display = 'none';
  };
}

async function deleteTag(id) {
  try {
    await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });
    generateCalendar(currentYear, currentMonth);
  } catch (err) {
    console.error('삭제 실패:', err);
  }
}

async function deleteRange(range) {
  try {
    await Promise.all(
      range.ids.map(rid => fetch(`${API_BASE}/${rid}`, { method: 'DELETE' }))
    );
    generateCalendar(currentYear, currentMonth);
  } catch (err) {
    console.error('연차 범위 삭제 실패:', err);
  }
}

document.getElementById('prev-month').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});

(async function init() {
  try {
    const meRes = await fetch('/api/auth/me', { credentials: 'include' });
    if (meRes.ok) {
      const me = await meRes.json();
      IS_ADMIN = me?.role === 'admin';
    }
  } catch {}
  await loadPopup();
  renderWeekdays();
  generateCalendar(currentYear, currentMonth);
})();
