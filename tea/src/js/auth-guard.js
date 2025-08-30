// Front-end auth guard: redirect to login if not authenticated
(function() {
  const path = location.pathname;
  const isAuthPage = /\/(login|signup)\.html$/i.test(path);
  // Public pages: root or index.html (Todo demo)
  const isPublicIndex = path.endsWith('/index.html') || path === '/' || /\/pages\/index\.html$/i.test(path);
  if (isAuthPage || isPublicIndex || window.AUTH_GUARD_DISABLED) return; // do not guard public/auth pages

  // call auth status
  fetch('/api/auth/me', { credentials: 'include' })
    .then(async (r) => {
      if (r.ok) return r.json();
      throw new Error('unauthorized');
    })
    .then((me) => {
      // optionally expose user info
      window.__ME__ = me;
    })
    .catch(() => {
      // Always point to absolute login page under /pages
      const nextPath = location.pathname || '/';
      const next = encodeURIComponent(nextPath);
      location.replace(`/pages/login.html?next=${next}`);
    });
})();
