import { useJsonSettings } from "@/entities/User";
import ThemeProvider from "./ThemeProvider";
import React from "react";
// обрщаемся к редаксу, из за этого не робит сторибук
// и обороч в земпровайдер в превью сторибука
// в независ. кусок логики, внедрили бизнес логику
// поэтому создали хок:

// hock:
export const withTheme = (Component: React.ComponentType) => {
  // возв. нови комп.
  return () => {
    const { theme: defaultTheme } = useJsonSettings();

    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    ); 
  };
};