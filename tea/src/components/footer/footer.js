// components/footer/footer.js
export async function loadFooter() {
  try {
    // ensure CSS
    const existing = document.querySelector('link[data-footer-style]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = './../components/footer/footer.css';
      link.setAttribute('data-footer-style', '');
      document.head.appendChild(link);
    }

    const res = await fetch('./../components/footer/footer.html');
    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    const footer = wrapper.firstElementChild;

    // avoid duplicates
    const old = document.querySelector('footer.app-footer');
    if (old) old.remove();

    document.body.appendChild(footer);

    // set year
    const y = footer.querySelector('#footer-year');
    if (y) y.textContent = String(new Date().getFullYear());
  } catch (e) {
    console.error('Failed to load footer:', e);
  }
}
