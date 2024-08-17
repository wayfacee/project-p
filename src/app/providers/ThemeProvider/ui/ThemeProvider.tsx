import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';
// советуется исп. относительные пути, чтобы переместить,
// и импортв не поменяются, а когда экспорт лучше абсолют.

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

// послед. тема выбр. у юзера, конкрет на устр.
// в частности для !inited
// можем проиниц. синх в юзстейте 27-стр.
const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  // defaultTheme = Theme.LIGHT было
  // прилож еще не загруз., данных о теме еще нет, а мы
  // уже иниц. тему, поэтому так не надо, а дефолт тему можно задать на 22-стр.
  const { theme: defaultTheme } = useJsonSettings();
  // чтоб не было скачков в интерфейсе:
  const [isThemeInited, setThemeInited] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    initialTheme || fallbackTheme || Theme.LIGHT,
  );

  // наверное не самое лучшее решение, надо подумать:
  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

  // вешаем класс на боди, и не надо вешать на модалки, и на апп итд.
  useEffect(() => {
    document.body.className = theme || Theme.LIGHT;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

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
