// Light/Dark theme utilities
// Usage:
//  - initTheme() on app start
//  - setTheme('light' | 'dark' | 'auto') to change

const THEME_KEY = 'theme'; // 'light' | 'dark' | 'auto'

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
  } else {
    // auto: remove explicit attr, let prefers-color-scheme drive it
    root.removeAttribute('data-theme');
  }
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'auto';
  } catch (_) {
    return 'auto';
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {}
}

export function setTheme(theme) {
  const next = theme === 'light' || theme === 'dark' ? theme : 'auto';
  storeTheme(next);
  applyTheme(next);
}

export function initTheme() {
  // 1) apply stored
  applyTheme(getStoredTheme());

  // 2) react to system change if in auto (no data-theme attr)
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = () => {
    if (!document.documentElement.getAttribute('data-theme')) {
      // still auto; re-apply to let CSS pick correct scheme
      applyTheme('auto');
    }
  };
  try {
    media.addEventListener('change', onSystemChange);
  } catch (_) {
    // Safari fallback
    media.addListener(onSystemChange);
  }

  // 3) keep tabs/windows in sync
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_KEY) applyTheme(getStoredTheme());
  });

  // 4) expose for quick manual toggling in console or UI hook
  if (!window.__theme) {
    window.__theme = { setTheme };
  }
}
