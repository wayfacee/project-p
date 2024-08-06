import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import * as cl from './Dropdown.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  direction?: DropdownDirection;
  trigger: ReactNode;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cl.optionsBottomLeft,
  'bottom right': cl.optionsBottomRight,
  'top right': cl.optionsTopRight,
  'top left': cl.optionsTopLeft,
};

export function Dropdown(props: DropdownProps) {
  const {
    className,
    items,
    trigger,
  } = props;

  return (
    <Menu as={'div'} className={classNames(cl.Dropdown, {}, [className])}>
      <MenuButton className={cl.btn}>
        {trigger}
      </MenuButton>
      <MenuItems className={cl.menu} anchor="bottom">
        {items.map(item => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type='button'
              onClick={item.onClick}
              disabled={item.disabled} // на кнопку тож надо продуб.
              className={classNames(cl.item, { [cl.active]: active })}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <MenuItem as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </MenuItem>
            )
          }

          return (
            <MenuItem as={Fragment} disabled={item.disabled}>
              {content}
            </MenuItem>
          )
        })}
      </MenuItems>
    </Menu>
  )
}