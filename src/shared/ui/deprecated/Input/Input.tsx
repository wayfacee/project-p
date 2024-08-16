import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cl from './Input.module.scss';
import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';

// исключаем, чтобы не объединился
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
}

// !!!!!!!** НЕ НАДО ДЕЛАТЬ В ПРОДАКШЕНЕ ЭТИ КАРЕТКИ!!!!!!

// memo - позволяет избежать лишних перерисовок

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated 
 */
export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    placeholder,
    type = 'text',
    autoFocus,
    readonly,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);

      // физически добавит фокус, а если нет,
      // то низя писать

      // модалка будет монтироваться, в самом начале
      // и когда нажимаем на кнопку войти, фокус пропадает
      // по хорошему реализ. такой функц. чтобы модалка могла
      // рендер. лениво + если будет асинх. комп., понадобится
      // нужно чтоб. уменьшить размер бандла
      ref.current?.focus();
    }
  }, [autoFocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // optional changing, если функц. не передана, то она
    // не будет вызвана
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  // when we are exisiting out of input
  const onBlur = () => {
    setIsFocused(false);
  };

  // when we are taping on input
  const onFocus = () => {
    setIsFocused(true);
  };

  // какая часть текста выделна, где находится каретка
  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // позивиця каретки
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const mods: Mods = {
    [cl.readonly]: readonly,
  };

  return (
    <div className={classNames(cl.InputWrapper, mods, [className])}>
      {placeholder && <div className={cl.placeholder}>{`${placeholder}>`}</div>}

      <div className={cl.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cl.input}
          onBlur={onBlur}
          onFocus={onFocus}
          onSelect={onSelect}
          readOnly={readonly}
          {...otherProps}
        />

        {isCaretVisible && (
          <span
            className={cl.caret}
            // ширина шрифта что ли
            style={{ left: `${caretPosition * 9}px` }}
          />
        )}
      </div>
    </div>
  );
});
