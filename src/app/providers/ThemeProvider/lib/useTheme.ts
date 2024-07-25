import { useContext, useEffect } from "react";
import { LOCAL_STORAGE_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    // контекст иниц. не сразу, в какое-то время пустой
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
  }

  // вешаем класс на боди, и не надо вешать на модалки, и на апп итд.
  useEffect(() => {
    document.body.className = theme || Theme.LIGHT;
  }, [theme]);

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  }
}