import { classNames, Mods } from "shared/lib/classNames/classNames";
import * as cl from './Select.module.scss';
import { ChangeEvent, memo, useMemo } from "react";

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    // на вверх отдаем выбранное знач.
    // можно так же через иф проверка или ?.
    onChange?.(e.target.value);
  }

  // <SelectOption[]>
  const optionsList = useMemo(() => {
    return options?.map(opt => (
      <option
        className={cl.option}
        value={opt.value}
        key={opt.value}
      >
        {opt.content}
      </option>
    ))
  }, [options]);

  // чтоб еслнит не соврачивал
  const mods: Mods = {}

  return (
    <div className={classNames(cl.Wrapper, mods, [className])}>
      {label && (
        <span className={cl.label}>
          {`${label}>`}
        </span>
      )}

      <select 
      // нет ридОнли
        disabled={readonly}
        className={cl.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});