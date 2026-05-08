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

const ensureHorizontalDirectionsStyles = () => {
  if (document.querySelector('link[href="horizontal-directions.css"]')) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'horizontal-directions.css';
  document.head.appendChild(link);
};

const setupHorizontalDirectionsDom = section => {
  section.classList.add('directions-section');
  section.dataset.horizontalScroll = 'true';

  if (section.querySelector('.directions-stage')) return;

  const heading = section.querySelector('.section-heading');
  const grid = section.querySelector('.directions-grid');
  if (!heading || !grid) return;

  const stage = document.createElement('div');
  stage.className = 'directions-stage';

  const viewport = document.createElement('div');
  viewport.className = 'directions-viewport';
  viewport.setAttribute('aria-label', 'Горизонтальная прокрутка базисных направлений');

  const progress = document.createElement('div');
  progress.className = 'directions-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';

  grid.classList.add('directions-track');

  section.appendChild(stage);
  stage.appendChild(heading);
  stage.appendChild(viewport);
  viewport.appendChild(grid);
  stage.appendChild(progress);
};

const horizontalSection = document.querySelector('#directions');

if (horizontalSection) {
  ensureHorizontalDirectionsStyles();
  setupHorizontalDirectionsDom(horizontalSection);

  const track = horizontalSection.querySelector('.directions-track');
  const viewport = horizontalSection.querySelector('.directions-viewport');
  const progressBar = horizontalSection.querySelector('.directions-progress span');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let maxShift = 0;
  let scrollDistance = 0;
  let ticking = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateHorizontalScroll = () => {
    if (!track || !viewport) return;

    const rect = horizontalSection.getBoundingClientRect();
    const stickyTop = parseFloat(getComputedStyle(horizontalSection).getPropertyValue('--directions-sticky-top')) || 88;
    const traveled = clamp(stickyTop - rect.top, 0, scrollDistance || 1);
    const progress = scrollDistance > 0 ? traveled / scrollDistance : 0;
    const shift = -maxShift * progress;

    track.style.setProperty('--directions-x', `${shift}px`);
    horizontalSection.style.setProperty('--directions-progress', progress.toFixed(4));
    horizontalSection.style.setProperty('--directions-left-fade', progress > 0.01 ? '1' : '0');
    horizontalSection.style.setProperty('--directions-right-fade', progress < 0.99 ? '1' : '0');

    if (progressBar) {
      progressBar.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
    }

    ticking = false;
  };

  const updateMetrics = () => {
    if (!track || !viewport) return;

    horizontalSection.classList.add('is-horizontal');

    const viewportWidth = viewport.clientWidth;
    const trackWidth = track.scrollWidth;
    maxShift = Math.max(trackWidth - viewportWidth, 0);

    const stickyTop = parseFloat(getComputedStyle(horizontalSection).getPropertyValue('--directions-sticky-top')) || 88;
    const stickyHeight = Math.max(window.innerHeight - stickyTop, 560);
    scrollDistance = maxShift > 0 ? maxShift : 0;

    horizontalSection.style.setProperty(
      '--directions-scroll-height',
      `${Math.ceil(stickyHeight + scrollDistance)}px`
    );

    updateHorizontalScroll();
  };

  const requestUpdate = () => {
    if (reduceMotion.matches) return;

    if (!ticking) {
      window.requestAnimationFrame(updateHorizontalScroll);
      ticking = true;
    }
  };

  if (!reduceMotion.matches) {
    updateMetrics();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', updateMetrics);
    window.addEventListener('orientationchange', updateMetrics);
    window.addEventListener('load', updateMetrics);
  }
}
