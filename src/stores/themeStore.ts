import { createSignal, createEffect, createRoot } from "solid-js";

// Theme types
export type Theme = "emerald" | "carbonsocks";

const THEME_STORAGE_KEY = "barbell-theme";

// Get initial theme from localStorage or default to light
const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "emerald";

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "emerald" || stored === "carbonsocks") {
    return stored;
  }

  // Check user's system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "carbonsocks";
  }

  return "emerald";
};

// Apply theme to document
const applyTheme = (theme: Theme) => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

const createThemeStore = () => {
  const [theme, setTheme] = createSignal<Theme>(getInitialTheme());

  // Apply theme on initialization
  applyTheme(theme());

  // Watch for theme changes and persist/apply them
  createEffect(() => {
    const currentTheme = theme();
    applyTheme(currentTheme);
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "emerald" ? "carbonsocks" : "emerald"));
  };

  const isDark = () => theme() === "carbonsocks";

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark,
  };
};

// Create singleton instance
export const ThemeStore = createRoot(createThemeStore);

// Export helper hooks
export const useTheme = () => ThemeStore.theme();
export const useIsDark = () => ThemeStore.isDark();
export const useToggleTheme = () => ThemeStore.toggleTheme;
export const useSetTheme = () => ThemeStore.setTheme;
