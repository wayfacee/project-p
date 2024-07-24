import * as cl from './Button.module.scss';
import { ButtonHTMLAttributes, FC, memo } from "react";
import { classNames } from 'shared/lib/classNames/classNames';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
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
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    theme,
    square,
    // классы в которых всегда тру, лучше в адишенал
    size = ButtonSize.M,
    disabled,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cl.square]: square,
    [cl.disabled]: disabled,
  }

  return (
    <button
      type="button"
      className={classNames(cl.Button, mods, [className, cl[theme], cl[size]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});