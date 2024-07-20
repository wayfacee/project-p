import ThemeProvider from "./ui/ThemeProvider"
import { useTheme } from "./lib/useTheme"
import { Theme } from "./lib/ThemeContext"

// public api, регулирует то, что отдаем наружу
export {
  ThemeProvider,
  useTheme,
  Theme,
}