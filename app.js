const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  menu.addEventListener('click', event => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}
