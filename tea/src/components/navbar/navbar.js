export function loadNavbar() {
    fetch('/components/navbar/navbar.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('navbar').innerHTML = html;
        // Body class for top navigation layout
        document.body.classList.add('with-topnav');

        // Ensure account area exists (top-right)
        let account = document.getElementById('account-area');
        if (!account) {
          account = document.createElement('div');
          account.id = 'account-area';
          document.body.appendChild(account);
        }

        // ✅ CSS 중복 로드 방지
        if (!document.querySelector('link[href="/components/navbar/navbar.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/components/navbar/navbar.css';
          document.head.appendChild(link);
        }

        // Normalize current page to match data-target values
        function getCurrentPage() {
          let path = window.location.pathname;
          // remove trailing slashes
          if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
          let file = path.split('/').pop() || '';
          // strip query/hash if any leaked into last segment (defensive)
          file = file.split('?')[0].split('#')[0];
          // default to index.html when path is directory root
          if (!file) file = 'index.html';
          return file;
        }
        function updateActive() {
          const currentPage = getCurrentPage();
          const tabs = document.querySelectorAll('.tab-btn');
          tabs.forEach(b => b.classList.remove('active'));
          tabs.forEach(b => {
            const target = b.dataset.target || '';
            // Normalize data-target to filename (supports '/pages/foo.html' and 'foo.html')
            const targetFile = target.split('/').pop();
            if (targetFile === currentPage) b.classList.add('active');
          });
        }
        function wireClicks() {
          const tabs = document.querySelectorAll('.tab-btn');
          tabs.forEach(btn => {
            if (btn.__wired) return; // avoid duplicate handlers
            btn.__wired = true;
            btn.addEventListener('click', () => {
              document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              const target = btn.dataset.target;
              if (!target) return;
              // Support absolute /pages/* or plain file names
              if (target.startsWith('/')) {
                location.href = target;
              } else {
                location.href = `/pages/${target}`;
              }
            });
          });
        }
        wireClicks();
        updateActive();

        // Theme toggle removed (static theme)

        // ===== Auth-aware navbar =====
        const loginBtn = document.querySelector('.tab-btn[data-target="/pages/login.html"], .tab-btn[data-target="login.html"]');
        const signupBtn = document.querySelector('.tab-btn[data-target="/pages/signup.html"], .tab-btn[data-target="signup.html"]');

        // Move auth buttons to account area by default (logged-out)
        if (loginBtn) account.appendChild(loginBtn);
        if (signupBtn) account.appendChild(signupBtn);

        fetch('/api/auth/me', { credentials: 'include' })
          .then(async (r) => {
            if (!r.ok) throw new Error('not logged in');
            return r.json();
          })
          .then((me) => {
            // 로그인 상태: 로그인/회원가입 숨기고 로그아웃/유저표시를 account-area에 표시
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';

            const nav = document.querySelector('.navbar-container');
            if (!nav) return;
            // 중복 추가 방지 (account-area 기준)
            if (account.querySelector('[data-role="user-info"]') || account.querySelector('[data-role="logout-btn"]')) return;

            // 로그인 사용자용: MY 탭
            let myBtn = nav.querySelector('[data-role="my-tab"]');
            if (!myBtn) {
              myBtn = document.createElement('button');
              myBtn.className = 'tab-btn';
              myBtn.setAttribute('data-role', 'my-tab');
              myBtn.setAttribute('data-target', '/pages/my.html');
              myBtn.textContent = 'MY';
              nav.insertBefore(myBtn, nav.firstChild);
              wireClicks();
              updateActive();
            }

            // 관리자 전용 탭
            let adminBtn = nav.querySelector('[data-role="admin-tab"]');
            if (me?.role === 'admin' && !adminBtn) {
              adminBtn = document.createElement('button');
              adminBtn.className = 'tab-btn';
              adminBtn.setAttribute('data-role', 'admin-tab');
              adminBtn.setAttribute('data-target', '/pages/admin.html');
              adminBtn.textContent = '관리자';
              adminBtn.style.position = 'relative';
              adminBtn.addEventListener('click', () => (location.href = '/pages/admin.html'));
              const badge = document.createElement('span');
              badge.className = 'badge';
              badge.style.display = 'none';
              adminBtn.appendChild(badge);
              nav.insertBefore(adminBtn, nav.firstChild);

              // 관리자 멤버 목록 탭
              const membersBtn = document.createElement('button');
              membersBtn.className = 'tab-btn';
              membersBtn.setAttribute('data-role', 'members-tab');
              membersBtn.setAttribute('data-target', '/pages/members.html');
              membersBtn.textContent = '멤버';
              membersBtn.addEventListener('click', () => (location.href = '/pages/members.html'));
              nav.insertBefore(membersBtn, adminBtn.nextSibling);

              // 새로 추가한 탭들에 대한 active/클릭 바인딩 갱신
              wireClicks();
              updateActive();
            }

            // pending badge updater
            async function refreshPending() {
              try {
                // 회원가입 대기
                const r1 = await fetch('/api/admin/pending-count', { credentials: 'include' });
                let c1 = 0; if (r1.ok) { const j = await r1.json(); c1 = j.count || 0; }
                // 연차 대기
                const r2 = await fetch('/api/admin/leave/pending-count', { credentials: 'include' });
                let c2 = 0; if (r2.ok) { const j2 = await r2.json(); c2 = j2.count || 0; }
                const count = (c1 || 0) + (c2 || 0);
                const btn = nav.querySelector('[data-role="admin-tab"]');
                if (!btn) return;
                let badge = btn.querySelector('.badge');
                if (!badge) {
                  badge = document.createElement('span');
                  badge.className = 'badge';
                  btn.appendChild(badge);
                }
                if (count > 0) {
                  badge.textContent = String(count);
                  badge.style.display = '';
                } else {
                  badge.style.display = 'none';
                }
              } catch (_) {
                // ignore errors (non-admin or network)
              }
            }
            if (me?.role === 'admin') {
              refreshPending();
              // light poll every 20s
              if (!window.__pendingPoll) {
                window.__pendingPoll = setInterval(refreshPending, 20000);
              }
              // 노출: 다른 페이지에서 즉시 뱃지 갱신 필요 시 호출
              window.__refreshPendingBadge = refreshPending;
            }

            const userSpan = document.createElement('span');
            userSpan.setAttribute('data-role', 'user-info');
            userSpan.style.marginLeft = '8px';
            userSpan.style.color = '#a0e7ff';
            const display = me?.name || me?.username;
            userSpan.textContent = display ? `안녕하세요, ${display}` : '로그인됨';

            const logoutBtn = document.createElement('button');
            logoutBtn.setAttribute('data-role', 'logout-btn');
            logoutBtn.className = 'tab-btn';
            logoutBtn.textContent = '로그아웃';
            logoutBtn.addEventListener('click', async () => {
              try {
                await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
              } catch {}
              location.href = '/pages/login.html';
            });

            account.appendChild(userSpan);
            account.appendChild(logoutBtn);
          })
          .catch(() => {
            // 비로그인 상태: 로그인/회원가입은 account-area에 남겨둠
            if (loginBtn) loginBtn.style.display = '';
            if (signupBtn) signupBtn.style.display = '';
          });
      });
  }