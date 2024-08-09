import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import * as cl from './Dropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import * as popupCl from '../../styles/popup.module.scss';

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

export function Dropdown(props: DropdownProps) {
  const {
    className,
    items,
    trigger,
    direction = 'bottom right',
  } = props;

  const menuClasses = mapDirectionClass[direction];

  return (
    <Menu as={'div'} className={classNames('', {}, [className, popupCl.popup])}>
      <MenuButton className={popupCl.trigger}>
        {trigger}
      </MenuButton>
      <MenuItems className={classNames(cl.menu, {}, [menuClasses])}>
        {items.map(item => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type='button'
              onClick={item.onClick}
              disabled={item.disabled} // на кнопку тож надо продуб.
              className={classNames(cl.item, { [popupCl.active]: active })}
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