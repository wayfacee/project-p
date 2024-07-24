import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Text.module.scss';
import { memo } from "react";

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme,
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
  } = props;

  return (
    <div className={classNames(cl.Text, { }, [className, cl[theme]])}>
      {title && (
        <p className={cl.title}>{title}</p>
      )}
      {text && (
        <p className={cl.text}>{text}</p>
      )}
    </div>
  );
});