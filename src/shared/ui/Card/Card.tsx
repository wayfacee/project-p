import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './Card.module.scss';
import { HTMLAttributes, memo, ReactNode } from "react";

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  fullWidth?: boolean;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    theme = CardTheme.NORMAL,
    fullWidth,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cl.Card, {[cl.fullWidth]: fullWidth}, [className, cl[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});