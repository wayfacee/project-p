import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import * as cl from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectionClass } from '../../styles/consts';
import * as popupCl from '../../styles/popup.module.scss';
import { Button } from '../../../Button';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '../../../Icon';

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode; // мб и иконку
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  items?: ListBoxItem<T>[];
  value?: T; // выбранное знач.
  defaultValue?: string;
  onChange: (value: T) => void;
  // (extends) чтобы рыботать с энамами, и тс автоматом хватил
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
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

  // вводится value = hardkored value in eng. (view, title etc.)
  // по хорошему отрис. локализованный текст
  // чтоб кд раз по массиву не итер.
  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

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
          <Button
            variant="filled"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions className={classNames(cl.options, {}, optionsClasses)}>
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
                    [popupCl.selected]: selected,
                  })}
                >
                  {selected}
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
