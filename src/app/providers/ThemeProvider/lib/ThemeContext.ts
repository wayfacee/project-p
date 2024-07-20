import { createContext } from "react";
// чтобы лежало все в одном местте типо theme

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
export const LOCAL_STORAGE_KEY = 'theme';