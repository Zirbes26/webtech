(() => {
  const storageKey = 'student-space-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try {
    preference = localStorage.getItem(storageKey);
  } catch (_) {
    // The switch still works when browser storage is unavailable.
  }
  if (preference !== 'dark' && preference !== 'light') preference = null;

  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#171e1a' : '#f7f7f2';
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.querySelector('span').textContent = dark ? '\u2600\uFE0F' : '\uD83C\uDF19';
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to night mode');
      button.title = dark ? 'Switch to light mode' : 'Switch to night mode';
    }
  }

  // Apply before the stylesheet loads to avoid flashing the wrong background.
  applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    applyTheme(document.documentElement.dataset.theme);
    button.hidden = false;
    button.addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(preference);
      try {
        localStorage.setItem(storageKey, preference);
      } catch (_) {
        // Keep the selected theme for this page even without persistence.
      }
    });
  });
  systemTheme.addEventListener('change', (event) => {
    if (!preference) applyTheme(event.matches ? 'dark' : 'light');
  });
})();
