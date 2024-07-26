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

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}  

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT
  } = props;

  return (
    <div className={classNames('Text', { }, [className, cl[theme], cl[align]])}>
      {title && (
        <p className={cl.title}>{title}</p>
      )}
      {text && (
        <p className={cl.text}>{text}</p>
      )}
    </div>
  );
});