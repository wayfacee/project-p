import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './Page.module.scss';
import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from "react";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getScrollSaveByPath, scrollSaveActions } from "@/features/ScrollSave";
import { useLocation } from "react-router-dom";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd,
  } = props;
  // чтоб тс не ругался
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  // помимо стейта принимает еще аргумент.
  // мы на прямую в useSelector не можем передать, 
  // пошта юзСелектор умеет раб. тока у кого 1 арг.
  const scrollPosition = useSelector(
    (state: StateSchema) => getScrollSaveByPath(state, pathname)
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  // можно не исп. юзКаллбэк
  // div = section / onScroll = UIEvent
  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollSaveActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname, // текущ стр. /articles
    }));

    // если в каких-то стр. не надо сохр.,
    // можно сделать isSaveScroll, и передавать из вне
  }, 500);

  // надо было сделать пейдж провайдер/контекст,
  // и управлять этим всем через реф, но мы через ид сделаем 

  return (
    <main
      ref={wrapperRef}
      className={classNames(cl.Page, {}, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
    >
      {children}
      {/* не всегда данные подгруз. */}
      {onScrollEnd
        ? <div className={cl.trigger} ref={triggerRef} />
        : null}
    </main>
  );
});