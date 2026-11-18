export const themeStorageKey = "alif-theme";

export const themeBootstrap = `(() => {
  const preference = matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem(${JSON.stringify(themeStorageKey)}); } catch {}
  root.dataset.theme = saved === 'light' || saved === 'dark' ? saved : preference.matches ? 'dark' : 'light';
  preference.addEventListener('change', (event) => {
    try {
      const choice = localStorage.getItem(${JSON.stringify(themeStorageKey)});
      if (choice === 'light' || choice === 'dark') return;
    } catch {}
    if (root.hasAttribute('data-theme-chosen')) return;
    root.dataset.theme = event.matches ? 'dark' : 'light';
  });
})();`;
