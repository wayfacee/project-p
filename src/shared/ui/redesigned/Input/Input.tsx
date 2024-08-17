import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cl from './Input.module.scss';
import React, {
  InputHTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HStack } from '../Stack';
import { Text } from '../Text';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  size?: InputSize;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    placeholder,
    type = 'text',
    autoFocus,
    readonly,
    addonLeft,
    addonRight,
    label,
    size = 'm',
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autoFocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const mods: Mods = {
    [cl.readonly]: readonly,
    [cl.focused]: isFocused,
    // по умолч. 16пх, с иконкой 8пх
    [cl.withAddonLeft]: Boolean(addonLeft),
    [cl.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div className={classNames(cl.InputWrapper, mods, [className, cl[size]])}>
      <div className={cl.addonLeft}>{addonLeft}</div>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        className={cl.input}
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly={readonly}
        placeholder={placeholder}
        {...otherProps}
      />
      <div className={cl.addonRight}>{addonRight}</div>
    </div>
  );

  // чтоб лишню дом ноду не добав
  if (label) {
    return (
      <HStack gap="8" max>
        <Text text={label} />
        {input}
      </HStack>
    );
  }

  return input;
});
