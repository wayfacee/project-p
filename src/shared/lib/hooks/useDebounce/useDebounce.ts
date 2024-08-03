
// отменять пред. событъе в течении какого-то времени
// до тех пор пока что то ввдоим в инпут, каллбэк
// не будет выз., когда пройдет делай, тогда будет
// вызван каллбэк, а все пред вызовы. отменены
import { MutableRefObject, useCallback, useRef } from "react";

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef() as MutableRefObject<any>; 
  
  return useCallback((...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}