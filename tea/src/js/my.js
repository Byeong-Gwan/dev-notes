// MY page script: profile load/save, leave apply, and list my requests

async function fetchJSON(url, opts = {}) {
  const r = await fetch(url, { credentials: 'include', ...opts });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Request failed');
  return r.json();
}

function renderMyRequests(list) {
  const wrap = document.getElementById('my-requests');
  wrap.innerHTML = '';
  if (!list || list.length === 0) {
    wrap.innerHTML = '<div class="item">신청 내역이 없습니다.</div>';
    return;
  }
  // Group by date desc already from API; just render
  for (const r of list) {
    const div = document.createElement('div');
    const cls = `status ${r.status || 'approved'}`;
    div.className = 'item';
    div.innerHTML = `
      <div>${r.date} • ${r.type}${r.reason ? ` • ${r.reason}` : ''}</div>
      <div class="${cls}">${r.status || 'approved'}</div>
    `;
    wrap.appendChild(div);
  }
}

async function loadProfile() {
  try {
    const me = await fetchJSON('/api/me/profile');
    const name = document.getElementById('name');
    const avatarUrl = document.getElementById('avatarUrl');
    const memo = document.getElementById('memo');
    const avatarPreview = document.getElementById('avatarPreview');
    if (name) name.value = me.name || '';
    if (avatarUrl) avatarUrl.value = me.avatarUrl || '';
    if (memo) memo.value = me.memo || '';
    if (avatarPreview) avatarPreview.src = me.avatarUrl || '';
  } catch (e) {
    console.warn('Profile load failed:', e.message);
    location.href = '/pages/login.html?next=' + encodeURIComponent('/pages/my.html');
  }
}

function wireProfileForm() {
  const avatarUrl = document.getElementById('avatarUrl');
  const avatarPreview = document.getElementById('avatarPreview');
  if (avatarUrl && avatarPreview) {
    avatarUrl.addEventListener('input', () => {
      avatarPreview.src = avatarUrl.value || '';
    });
  }
  const saveBtn = document.getElementById('save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      saveBtn.disabled = true;
      try {
        const payload = {
          name: document.getElementById('name')?.value || '',
          avatarUrl: document.getElementById('avatarUrl')?.value || '',
          memo: document.getElementById('memo')?.value || ''
        };
        await fetchJSON('/api/me/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        alert('저장되었습니다.');
      } catch (e) {
        alert('저장 실패: ' + e.message);
      } finally {
        saveBtn.disabled = false;
      }
    });
  }
}

async function loadMyRequests() {
  try {
    const list = await fetchJSON('/api/leave/my');
    renderMyRequests(list);
  } catch (e) {
    console.error('내 신청 내역 불러오기 실패:', e.message);
  }
}

function wireLeaveForm() {
  const applyBtn = document.getElementById('apply-leave');
  if (!applyBtn) return;
  applyBtn.addEventListener('click', async () => {
    const type = document.getElementById('leave-type')?.value;
    const start = document.getElementById('leave-start')?.value;
    const end = document.getElementById('leave-end')?.value || start;
    const reason = document.getElementById('leave-reason')?.value || '';
    if (!type || !start) {
      alert('종류와 시작일을 입력하세요.');
      return;
    }
    applyBtn.disabled = true;
    try {
      await fetchJSON('/api/leave/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, start, end, reason })
      });
      alert('신청이 접수되었습니다. 관리자 승인 대기 중입니다.');
      await loadMyRequests();
    } catch (e) {
      alert('신청 실패: ' + e.message);
    } finally {
      applyBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadProfile();
  wireProfileForm();
  wireLeaveForm();
  await loadMyRequests();
  await renderAlgoHeatmaps();
});

// ===== Algorithm heatmap (GitHub-like) =====
async function renderAlgoHeatmaps() {
  const solvesEl = document.getElementById('heatmap-solves');
  const reviewsEl = document.getElementById('heatmap-reviews');
  if (!solvesEl || !reviewsEl) return; // not on this page

  let data;
  try {
    data = await fetchJSON('/api/algos/activity');
  } catch (e) {
    console.warn('활동 잔디 불러오기 실패:', e.message);
    return;
  }

  const from = new Date(data.from + 'T00:00:00');
  const to = new Date(data.to + 'T00:00:00');
  // Build day list inclusive
  const days = [];
  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  // Pad head so first column starts on Sunday
  const headPad = (days[0]?.getDay() ?? 0); // 0=Sun
  const padded = new Array(headPad).fill(null).concat(days);

  const getKey = (dt) => {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`; // local date key
  };
  const getLevel = (n, type) => {
    // thresholds can be tuned later
    if (!n || n <= 0) return '';
    if (n === 1) return 'l1';
    if (n <= 3) return 'l2';
    if (n <= 6) return 'l3';
    return 'l4';
  };

  const build = (container, type) => {
    container.innerHTML = '';
    for (const it of padded) {
      const cell = document.createElement('div');
      cell.className = 'cell ' + (type === 'solve' ? 'solve' : 'review');
      if (it === null) {
        // blank pad
        cell.setAttribute('data-count', '0');
        container.appendChild(cell);
        continue;
      }
      const key = getKey(it);
      const rec = data.days[key] || { solves: 0, reviews: 0 };
      const cnt = type === 'solve' ? (rec.solves || 0) : (rec.reviews || 0);
      const lvl = getLevel(cnt, type);
      if (lvl) cell.classList.add(lvl);
      cell.setAttribute('data-count', String(cnt));
      // tooltip
      const tip = document.createElement('div');
      tip.className = 'tooltip';
      tip.textContent = `${key} • ${type === 'solve' ? '풀이' : '리뷰'}: ${cnt}`;
      cell.appendChild(tip);
      container.appendChild(cell);
    }
  };

  build(solvesEl, 'solve');
  build(reviewsEl, 'review');
}
