// Admin approvals page logic
// - Guards page: only admin can view
// - Lists pending users and allows approving

async function getMe() {
  try {
    const r = await fetch('/api/auth/me', { credentials: 'include' });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function ensureAdmin() {
  const me = await getMe();
  if (!me) {
    location.href = 'login.html?next=' + encodeURIComponent('admin.html');
    return null;
  }
  if (me.role !== 'admin') {
    // Non-admin users: send to menu
    location.href = 'menu.html';
    return null;
  }
  return me;
}

async function fetchPending() {
  const r = await fetch('/api/admin/users?status=pending', { credentials: 'include' });
  if (!r.ok) throw new Error('Failed to load pending users');
  return await r.json();
}

async function fetchApproved() {
  const r = await fetch('/api/admin/users?status=approved', { credentials: 'include' });
  if (!r.ok) throw new Error('Failed to load approved users');
  return await r.json();
}

function formatDate(iso) {
  try {
    return iso ? new Date(iso).toLocaleString() : '-';
  } catch { return '-'; }
}

function renderPending(list) {
  const table = document.getElementById('pending-table');
  const empty = document.getElementById('pending-empty');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  if (!list || list.length === 0) {
    table.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  table.style.display = 'table';

  for (const u of list) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.username}</td>
      <td>${u.name || '-'}</td>
      <td>${u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
      <td>
        <button type="button" class="approve-btn" data-id="${u.id}">승인</button>
        <button type="button" class="reject-btn" data-id="${u.id}" style="margin-left:8px;background:#e55353;color:#fff;border:none;border-radius:10px;padding:8px 12px;cursor:pointer;">거절</button>
      </td>
    `;
    tbody.appendChild(tr);
  }

  tbody.querySelectorAll('.approve-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      btn.disabled = true;
      try {
        const r = await fetch(`/api/admin/users/${id}/approve`, { method: 'POST', credentials: 'include' });
        if (!r.ok) throw new Error();
        await load();
        if (window.__refreshPendingBadge) window.__refreshPendingBadge();
      } catch {
        alert('승인 실패');
      } finally {
        btn.disabled = false;
      }
    });
  });

  tbody.querySelectorAll('.reject-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (!confirm('이 가입 요청을 거절하시겠어요? 계정은 삭제되며 다시 가입 요청해야 합니다.')) return;
      btn.disabled = true;
      try {
        const r = await fetch(`/api/admin/users/${id}/reject`, { method: 'POST', credentials: 'include' });
        if (!r.ok) throw new Error();
        await load();
        if (window.__refreshPendingBadge) window.__refreshPendingBadge();
      } catch {
        alert('거절 실패');
      } finally {
        btn.disabled = false;
      }
    });
  });
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

function renderApproved(list) {
  const table = document.getElementById('approved-table');
  const empty = document.getElementById('approved-empty');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  if (!list || list.length === 0) {
    table.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  table.style.display = 'table';

  for (const u of list) {
    const tr = document.createElement('tr');
    tr.className = 'clickable-row';
    tr.dataset.userId = u.id;
    tr.dataset.role = u.role;
    const roleBadge = `<span class="role-badge">${u.role}</span>`;
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.username}</td>
      <td>${u.name || '-'}</td>
      <td>${roleBadge}</td>
      <td>${formatDate(u.createdAt)}</td>
    `;
    // Single click: select row
    tr.addEventListener('click', () => {
      tbody.querySelectorAll('tr').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
    });
    // Double click: prompt to grant manager
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
}

async function load() {
  const me = await ensureAdmin();
  if (!me) return;
  try {
    const pending = await fetchPending();
    renderPending(pending);
    const approved = await fetchApproved();
    renderApproved(approved);
  } catch (e) {
    console.error(e);
    alert('승인 목록을 불러오지 못했습니다.');
  }
}

document.addEventListener('DOMContentLoaded', load);
