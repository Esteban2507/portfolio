const menuButton = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (menuButton && siteNav) {
  const mobileLayout = window.matchMedia('(max-width: 48rem)');
  const masthead = menuButton.closest('.masthead');

  function setMenuOpen(open) {
    menuButton.setAttribute('aria-expanded', String(open));
  }

  masthead.classList.add('has-menu-toggle');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!open);
  });
  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  masthead.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileLayout.matches && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  mobileLayout.addEventListener('change', () => setMenuOpen(false));
}
