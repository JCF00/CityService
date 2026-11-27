(function () {
  const STORAGE_KEY = "cityservice_tema";
  const THEMES = ["light", "dark"];

  function readTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
    } catch (error) {
      return "light";
    }
  }

  function syncControls() {
    const theme = document.documentElement.dataset.theme || readTheme();
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      const isDark = theme === "dark";
      button.setAttribute("aria-checked", String(isDark));
      button.setAttribute("aria-label", isDark ? "Desativar tema escuro" : "Ativar tema escuro");
      button.setAttribute("title", isDark ? "Desativar tema escuro" : "Ativar tema escuro");
    });
  }

  function applyTheme(theme, notify = true) {
    if (!THEMES.includes(theme)) return false;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    syncControls();
    if (notify) {
      document.dispatchEvent(new CustomEvent("cityservice:themechange", { detail: { theme } }));
    }
    return true;
  }

  function setTheme(theme) {
    if (!THEMES.includes(theme)) return false;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Não foi possível salvar a preferência de tema.", error);
    }
    return applyTheme(theme);
  }

  function toggleTheme() {
    return setTheme(readTheme() === "dark" ? "light" : "dark");
  }

  applyTheme(readTheme(), false);

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-theme-toggle]");
    if (button) {
      event.preventDefault();
      toggleTheme();
    }
  });

  window.addEventListener("storage", event => {
    if (event.key !== STORAGE_KEY) return;
    applyTheme(event.newValue === "dark" ? "dark" : "light");
  });

  document.addEventListener("cityservice:languagechange", syncControls);
  document.addEventListener("DOMContentLoaded", syncControls, { once: true });

  window.CityServiceTheme = {
    getTheme: readTheme,
    setTheme,
    toggleTheme,
    syncControls
  };
})();
