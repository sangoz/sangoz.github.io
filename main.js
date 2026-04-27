const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((node) => observer.observe(node));

const backToTop = document.getElementById('backToTop');

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const yearNode = document.getElementById('currentYear');

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-toggle-icon');
const themeStorageKey = 'profile-theme';

const applyTheme = (theme) => {
  const isLight = theme === 'light';

  document.body.classList.toggle('light', isLight);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }

  if (themeIcon) {
    themeIcon.textContent = isLight ? '☀' : '☾';
  }
};

const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = localStorage.getItem(themeStorageKey) || (prefersLight ? 'light' : 'dark');
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light') ? 'dark' : 'light';

    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
  });
}
