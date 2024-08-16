// слишком много пишем цсс, в идеале ui библа. должна охватывать
// все кейсы которые предусмотр. дизайнером, в соотв. вашей дизайн системой.

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cl from './Flex.module.scss';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

// лучше создавать Union types, чем перечисления
// пошта надо импортить итд. + в жс компил.
export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
// это опред. дизайнер, а мы переносим в код из дизайна
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
  start: cl.justifyStart,
  center: cl.justifyCenter,
  end: cl.justifyEnd,
  between: cl.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cl.alignStart,
  center: cl.alignCenter,
  end: cl.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cl.directionRow,
  column: cl.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: cl.gap4,
  8: cl.gap8,
  16: cl.gap16,
  32: cl.gap32,
};

// появятся пропсы как у дива, можно поменять роль
// фактически див, а с точки семнтики спаном можем сделать role='span'
type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [cl.max]: max,
  };

  return (
    <div className={classNames(cl.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
