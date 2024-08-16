// может содержать любой контент
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Popover.module.scss';
import { ReactNode } from 'react';
import {
  Popover as HPopover,
  PopoverButton as HPopoverButton,
  PopoverPanel as HPopoverPanel,
} from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import * as popupCl from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, direction = 'bottom right', trigger, children } = props;

  const menuClasses = [mapDirectionClass[direction], popupCl.menu];

  // HPopover = H - headless, чтоб не было пересич.
  return (
    <HPopover className={classNames('', {}, [className, popupCl.popup])}>
      <HPopoverButton
        as="div" // button into button??? bad
        className={popupCl.trigger}
      >
        {trigger}
      </HPopoverButton>

      <HPopoverPanel className={classNames(cl.panel, {}, menuClasses)}>
        {children}
      </HPopoverPanel>
    </HPopover>
  );
}
