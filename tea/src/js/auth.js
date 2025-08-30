// Simple auth handlers for login and signup pages
import { loadNavbar } from './../components/navbar/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  const navbarHost = document.getElementById('navbar');
  if (navbarHost) loadNavbar();

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const payload = { username: fd.get('username'), password: fd.get('password'), remember: fd.get('remember') };
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      try {
        const resp = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'include',
        });
        const json = await resp.json();
        if (!resp.ok) throw new Error(json.error || 'Login failed');
        alert(`로그인 성공: ${json.username}`);
        // redirect after login: always go to menu management page
        window.location.href = 'menu.html';
      } catch (err) {
        alert(err.message);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(signupForm);
      const payload = { username: fd.get('username'), password: fd.get('password'), name: fd.get('name') };
      if (!payload.name || !payload.name.trim()) {
        alert('이름을 입력해주세요.');
        return;
      }
      try {
        const resp = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'include',
        });
        const json = await resp.json();
        if (!resp.ok) throw new Error(json.error || 'Signup failed');
        const msg = json.message || '승인 요청이 접수되었습니다. 관리자의 승인 후 로그인할 수 있습니다.';
        alert(msg);
        window.location.href = 'login.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }
});
