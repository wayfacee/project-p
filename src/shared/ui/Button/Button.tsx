import * as cl from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from 'shared/lib/classNames/classNames';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme,
    square,
    // классы в которых всегда тру, лучше в адишенал
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cl.square]: square,
  }

  return (
    <button
      type="button"
      className={classNames(cl.Button, mods, [className, cl[theme], cl[size]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};