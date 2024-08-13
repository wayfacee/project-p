// в момент скролла, отраб. 150 акщенов, спамят жоска
// тротлинг - выполнить одно событъе в промежуток времени
// сохранять позцию скролла раз в сек.

import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttleRef = useRef(false); // можно вызывать сейчас
  // каллюэк или нельзя

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback(
    (...args: any[]) => {
      // обяз. если фалс
      if (!throttleRef.current) {
        callback(...args);
        // будут проигнор. если трот не будет фалс.
        throttleRef.current = true;

        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
}
