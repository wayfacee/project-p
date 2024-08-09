import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import * as cl from './Select.module.scss';
import { ChangeEvent, useMemo } from "react";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

// generics - с мемо не оч работают, поэтому убрали
export const Select = <T extends string>(props: SelectProps<T>) => {
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
    onChange?.(e.target.value as T); // здесб можно скастовать
    // сверху есть тайп глаб, который не даст передать лиш. знач
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
};