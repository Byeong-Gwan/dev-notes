// Common UI initializer to load the navbar component on non-auth pages
import { loadNavbar } from './../components/navbar/navbar.js';
import { loadFooter } from './../components/footer/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  const navbarHost = document.getElementById('navbar');
  if (navbarHost) loadNavbar();
  // Load footer globally
  loadFooter();
});
