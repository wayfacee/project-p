import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';
// советуется исп. относительные пути, чтобы переместить,
// и импортв не поменяются, а когда экспорт лучше абсолют.

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
  // чтоб не было скачков в интерфейсе:
  const [isThemeInited, setIsThemeInited] = useState(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  // наверное не самое лучшее решение, надо подумать:
  useEffect(() => {
    if (!isThemeInited) {
      setTheme(defaultTheme);
      setIsThemeInited(true);
    } 
  }, [defaultTheme, isThemeInited]);

  // позволяет меморизировать знач какого-то obj, arr,
  // и не создавать новый, а возв. уже сущ.,
  // если из зависа. массива. ниче не измен.
  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    // кд раз будет перерисовываться
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
