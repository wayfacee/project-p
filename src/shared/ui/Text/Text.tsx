import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Text.module.scss';
import { memo } from "react";

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}  

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
  } = props;

  return (
    <div className={classNames('Text', { }, [className, cl[theme], cl[align], cl[size]])}>
      {title && (
        <p className={cl.title}>{title}</p>
      )}
      {text && (
        <p className={cl.text}>{text}</p>
      )}
    </div>
  );
});