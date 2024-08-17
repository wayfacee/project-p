import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

// костыль - в риль проектах лучше не делать
const ForceUpdateContext = createContext({
  value: true,
  forceUpdate: () => {},
});

export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);

  return forceUpdate;
};

export function ForceUpdateProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(true);

  const forceUpdate = () => {
    setValue((prev) => !prev);
    setTimeout(() => {
      setValue((prev) => !prev);
    }, 120);
  };

  const valueContext = useMemo(() => {
    return { value, forceUpdate };
    // forceUpdate не надо доавблять, пошта не исп. внешних завис. стейта:
    // сетВэлью которая всегда стабильна, поэтому в юзкаллбэк не над оборач.
    // а если вместо !prev => !value, то линтер начнет ругаться
  }, [value]);

  // уничтожается, но таймаут идет
  if (!value) {
    return null;
  }

  // когда таймаут отработал на тру:
  return (
    <ForceUpdateContext.Provider value={valueContext}>
      {children}
    </ForceUpdateContext.Provider>
  );
}
