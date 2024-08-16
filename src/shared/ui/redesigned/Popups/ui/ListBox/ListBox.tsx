import {
  Button,
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import * as cl from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectionClass } from '../../styles/consts';
import * as popupCl from '../../styles/popup.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode; // мб и иконку
  disabled?: boolean;
}

interface ListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string; // выбранное знач.
  defaultValue?: string;
  onChange: (value: string) => void;
  // (extends) чтобы рыботать с энамами, и тс автоматом хватил
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export function ListBox(props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom left',
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction], popupCl.menu];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}

      <HListbox
        disabled={readonly}
        as={'div'} // какая будет обертка
        className={classNames('', {}, [className, popupCl.popup])}
        value={value}
        onChange={onChange}
      >
        <ListboxButton disabled={readonly} className={cl.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </ListboxButton>
        <ListboxOptions
          className={classNames(cl.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <ListboxOption
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment} // чтоб не создавалась лишняя нода
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cl.item, {
                    [popupCl.active]: active,
                    [popupCl.disabled]: item.disabled,
                  })}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HListbox>
    </HStack>
  );
}
