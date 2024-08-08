// может содержать любой контент
import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Popover.module.scss';
import { ReactNode } from "react";
import { Popover as HPopover } from '@headlessui/react'
import { DropdownDirection } from "shared/types/ui";
import { mapDirectionClass } from "../../styles/consts";
import * as popupCl from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const {
    className,
    direction = "bottom right",
    trigger,
    children
  } = props;

  const menuClasses = mapDirectionClass[direction];

// HPopover = H - headless, чтоб не было пересич.
  return (
    <HPopover className={classNames('', {}, [className, popupCl.popup])}>
      <HPopover.Button className={popupCl.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel
        className={classNames(cl.panel, {}, [menuClasses])}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  )
}