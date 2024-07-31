import { MutableRefObject, useEffect } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>; // wrapper
  // внутри которого наход. скролл 
  // (иногда это document, when it's global)
};

// Intersection Observer API 
// позволяет след. за появл. каких-то элем., и реализ. лэйзи
// лоадинг (бесконечную ленту итд.)

// можно исп. где угодно, где есть скролл

export function useInfiniteScroll(props: UseInfiniteScrollOptions) {
  const {
    callback,
    triggerRef,
    wrapperRef
  } = props;
  
  useEffect(() => {
    // данные могут измен. затир., а отпис. от событья внутри юзЭффекта
    // изолируем элем., замыкаем внутри каллбэке который передаем. в юзЭффект
    // будет доступ. когда комп. уже демонтировался
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperElement, // элем в котором. наход. скролл
        rootMargin: "0px",
        threshold: 1.0,
      };
  
      // callback - будет вызов. когда элем. появился
      observer = new IntersectionObserver(([entry]) => {
        // только когда появляется:
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observer.observe(triggerElement); // зачем мы будем следить
    }
    

    return () => {
      if (observer && triggerElement) {
        // отпис. от слежкки 
        // triggerRef - сс. на который меняться не будет
        // триггерить юзэффект лишний раз не будет

        // triggerRef - уже отчистился, а элем. - сохран.
        observer.unobserve(triggerElement);
      }
    }
  }, [callback, triggerRef, wrapperRef]);
}