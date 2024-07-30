import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Card.module.scss';
import { HTMLAttributes, memo, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cl.Card, {}, [className])}
      {...otherProps}
    >
      {children}
    </div>
  );
});