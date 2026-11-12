const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('.primary-nav');

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNavigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Close menu' : 'Open menu';
  });

  primaryNavigation.addEventListener('click', (event) => {
    if (event.target.matches('a') && primaryNavigation.classList.contains('is-open')) {
      primaryNavigation.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.querySelector('.sr-only').textContent = 'Open menu';
    }
  });
}
