export const themeStorageKey = "alif-theme";
export const defaultTheme = "dark";

export const themeBootstrap = `(() => {
  let saved;
  try { saved = localStorage.getItem(${JSON.stringify(themeStorageKey)}); } catch {}
  document.documentElement.dataset.theme = saved === 'light' || saved === 'dark' ? saved : '${defaultTheme}';
})();`;
