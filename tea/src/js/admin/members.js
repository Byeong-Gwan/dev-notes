async function ensureAdmin() {
  try {
    const r = await fetch('/api/auth/me', { credentials: 'include' });
    if (!r.ok) throw new Error('unauth');
    const me = await r.json();
    if (!me || me.role !== 'admin') throw new Error('forbidden');
    return me;
  } catch {
    alert('관리자만 접근할 수 있습니다.');
    location.href = 'index.html';
    return null;
  }
}

async function fetchMembers() {
  const r = await fetch('/api/admin/users?status=approved', { credentials: 'include' });
  if (!r.ok) throw new Error('Failed to load members');
  return await r.json();
}

async function setRole(userId, role) {
  const r = await fetch(`/api/admin/users/${userId}/role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ role })
  });
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    throw new Error(d.error || '권한 변경 실패');
  }
  return await r.json();
}

function renderMembers(list) {
  const table = document.getElementById('members-table');
  const empty = document.getElementById('members-empty');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  if (!list || list.length === 0) {
    empty.style.display = '';
    table.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  table.style.display = 'table';

  for (const u of list) {
    const tr = document.createElement('tr');
    tr.className = 'clickable-row';
    tr.dataset.userId = u.id;
    tr.dataset.role = u.role;
    const isAdmin = u.role === 'admin';
    const roleBadge = `<span class="role-badge">${u.role}</span>`;
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.username}</td>
      <td>${u.name || '-'}</td>
      <td>${roleBadge}</td>
      <td>${u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
      <td>
        ${isAdmin ? '<span style="color:#9aa3b2;">-</span>' : `<button type="button" class="del-btn" data-id="${u.id}">삭제</button>`}
      </td>
    `;
    // Single click: select row
    tr.addEventListener('click', () => {
      tbody.querySelectorAll('tr').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
    });
    // Double click: grant manager if not admin/manager
    tr.addEventListener('dblclick', async () => {
      if (u.role === 'admin') {
        alert('관리자 역할은 변경할 수 없습니다.');
        return;
      }
      if (u.role === 'manager') {
        alert('이미 매니저 권한이 있습니다.');
        return;
      }
      const ok = confirm('매니저 권한을 부여하시겠습니까?');
      if (!ok) return;
      try {
        await setRole(u.id, 'manager');
        await load();
      } catch (e) {
        alert(e.message || '권한 부여 실패');
      }
    });
    tbody.appendChild(tr);
  }

  tbody.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (!confirm('이 멤버를 삭제하시겠어요? 해당 사용자는 다시 가입해야 합니다.')) return;
      btn.disabled = true;
      try {
        const r = await fetch(`/api/admin/users/${id}`, { method: 'DELETE', credentials: 'include' });
        if (!r.ok) throw new Error();
        await load();
      } catch {
        alert('삭제 실패');
      } finally {
        btn.disabled = false;
      }
    });
  });
}

async function load() {
  const me = await ensureAdmin();
  if (!me) return;
  try {
    const members = await fetchMembers();
    renderMembers(members);
  } catch (e) {
    console.error(e);
    alert('멤버 목록을 불러오지 못했습니다.');
  }
}

load();
