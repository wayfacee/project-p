import { useContext } from 'react';
// можно относительным
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
  theme: Theme;
  // чтобы разраб мог опред., куда мы сохраняем эту тему (локал, или бэк)
  toggleTheme: (saveAction?: (theme: Theme) => void) => void; 
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme(saveAction?: (theme: Theme) => void) {
    // const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    let newTheme: Theme;
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.VIOLET;
        break;
      case Theme.VIOLET:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
        break;
    }

    // контекст иниц. не сразу, в какое-то время пустой
    setTheme?.(newTheme);
    // localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    saveAction?.(newTheme);
  }


  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
