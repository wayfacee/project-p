import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Card.module.scss';
import { HTMLAttributes, memo, ReactNode } from 'react';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'normal' | 'round' | 'partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  border?: CardBorder;
  max?: boolean;
  maxHeight?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = 'normal',
    padding = '8',
    border = 'normal',
    max,
    maxHeight,
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      className={classNames(cl.Card, { [cl.max]: max, [cl.maxHeight]: maxHeight}, [
        className,
        cl[variant],
        cl[paddingClass],
        cl[border],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
