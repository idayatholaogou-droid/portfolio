
const burger   = document.getElementById('burgerBtn');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  navLinks.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    const fill = entry.target.querySelector('.skill-fill');
    if (fill) setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 200);
    skillObserver.unobserve(entry.target);  
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
  skillObserver.observe(el);
});

const tabs         = document.querySelectorAll('.filter-tab');
const cards        = document.querySelectorAll('.project-card');
const grids        = document.querySelectorAll('.projects-grid');
const diapoSection = document.querySelector('.historiques-section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    const filter = tab.dataset.filter;

    diapoSection.style.display = filter === 'all' ? '' : 'none';

    cards.forEach(card => {
      const cats = (card.dataset.category || '').split(' ');
      const show = filter === 'all' || cats.includes(filter);
      card.style.display = show ? '' : 'none';
    });

    grids.forEach(grid => {
      const hasVisible = [...grid.querySelectorAll('.project-card')]
        .some(card => card.style.display !== 'none');
      grid.style.display = hasVisible ? '' : 'none';
      const title = grid.previousElementSibling;
      if (title && title.classList.contains('category-title')) {
        title.style.display = hasVisible ? '' : 'none';
      }
    });
  });
});

const track   = document.querySelector('.diaporama-track');
const slides  = document.querySelectorAll('.diaporama-slide');
const btnPrev = document.querySelector('.diaporama-btn.prev');
const btnNext = document.querySelector('.diaporama-btn.next');
const dotsBox = document.querySelector('.diaporama-dots');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goTo(i));
  dotsBox.appendChild(dot);
});
const dots = dotsBox.querySelectorAll('span');

function goTo(i) {
  current = (i + slides.length) % slides.length;  
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, n) => d.classList.toggle('active', n === current));
}

btnPrev.addEventListener('click', () => goTo(current - 1));
btnNext.addEventListener('click', () => goTo(current + 1));
goTo(0);