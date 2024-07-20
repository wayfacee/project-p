import { useContext } from "react";
import { LOCAL_STORAGE_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
  }

  return {
    theme,
    toggleTheme,
  }
}