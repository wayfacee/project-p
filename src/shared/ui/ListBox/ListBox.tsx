import { Button, Listbox as HListbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import * as cl from './ListBox.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { HStack } from '../Stack';

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

  const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cl.optionsBottomLeft,
    'bottom right': cl.optionsBottomRight,
    'top right': cl.optionsTopRight,
    'top left': cl.optionsTopLeft,
  };

  const optionsClasses = mapDirectionClass[direction];

  return (
    <HStack gap='4'>
      {label && <span>{`${label}>`}</span>}

      <HListbox
        disabled={readonly}
        as={'div'} // какая будет обертка
        className={classNames(cl.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >

        <ListboxButton
          disabled={readonly}
          className={cl.trigger}
        >
          <Button
            disabled={readonly}
          >
            {value ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions anchor="bottom"
          className={classNames(cl.options, {}, [optionsClasses])}
        >

          {items?.map((item) => (
            <ListboxOption
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment} // чтоб не создавалась лишняя нода
            >
              {({ active, selected }) => (
                <li className={classNames(cl.item, {
                  [cl.active]: active,
                  [cl.disabled]: item.disabled,
                })}>
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HListbox>
    </HStack>

  )
}