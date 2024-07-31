import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Page.module.scss';
import { memo, MutableRefObject, ReactNode, useRef } from "react";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd,
  } = props;
  // чтоб тс не ругался
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  })

  return (
    <section 
    ref={wrapperRef}
    className={classNames(cl.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
});