// Front-end auth guard: redirect to login if not authenticated
(function() {
  const isAuthPage = /\/(login|signup)\.html$/i.test(location.pathname);
  if (isAuthPage) return; // do not guard auth pages

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
      const next = encodeURIComponent(location.pathname.split('/').pop());
      location.replace(`login.html?next=${next}`);
    });
})();
