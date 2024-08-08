import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import * as cl from './Drawer.module.scss';
import { Portal } from 'widgets/Portal/Portal';

// шторка для моб. тел.

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
  } = props;
  const { theme } = useTheme();

  const mods: Mods = {
    [cl.opened]: isOpen,
  };

  return (
    <Portal>
      <div className={classNames(cl.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <div
          className={cl.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
