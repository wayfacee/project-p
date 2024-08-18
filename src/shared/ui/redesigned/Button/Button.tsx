import * as cl from './Button.module.scss';
import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  variant?: ButtonVariant;
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean;
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize;
  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean;
  /**
   * Содержимое кнопки
   */
  children?: ReactNode;
  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  color?: ButtonColor;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    // классы в которых всегда тру, лучше в адишенал
    size = 'm',
    disabled,
    fullWidth,
    addonLeft,
    addonRight,
    color = 'normal',
    ...otherProps
  } = props;

  const mods: Mods = {
    [cl.square]: square,
    [cl.disabled]: disabled,
    [cl.fullWidth]: fullWidth,
    // если есть аддоны будем уменш. отсутпы
    [cl.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
  };

  return (
    <button
      type="button"
      className={classNames(cl.Button, mods, [
        className,
        cl[variant],
        cl[size],
        cl[color],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      <div className={cl.addonLeft}>{addonLeft}</div>
      {children}
      <div className={cl.addonRight}>{addonRight}</div>
    </button>
  );
});