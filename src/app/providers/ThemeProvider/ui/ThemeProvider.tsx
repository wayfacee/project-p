import { ReactNode, useMemo, useState } from "react";
import { ThemeContext } from "../../../../shared/lib/context/ThemeContext";
import { LOCAL_STORAGE_KEY } from "@/shared/const/theme";
import { Theme } from "@/shared/const/theme";
// советуется исп. относительные пути, чтобы переместить,
// и импортв не поменяются, а когда экспорт лучше абсолют.

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    children,
    initialTheme
  } = props;
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

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