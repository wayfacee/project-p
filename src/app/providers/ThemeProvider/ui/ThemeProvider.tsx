import { FC, useMemo, useState } from "react";
import { LOCAL_STORAGE_KEY, Theme, ThemeContext } from "../lib/ThemeContext";
// советуется исп. относительные пути, чтобы переместить,
// и импортв не поменяются, а когда экспорт лучше абсолют.

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme || Theme.LIGHT;

const ThemeProvider: FC<{ children: React.ReactNode }> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // позволяет меморизировать знач какого-то obj, arr,
  // и не создавать новый, а возв. уже сущ.,
  // если из зависа. массива. ниче не измен.
  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme])

  return (
    // кд раз будет перерисовываться
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;