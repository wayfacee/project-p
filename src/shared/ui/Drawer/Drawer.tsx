import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import * as cl from './Drawer.module.scss';
import { Portal } from 'widgets/Portal/Portal';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

// шторка для моб. тел.

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
    lazy,
  } = props;
  const { theme } = useTheme();

  const {
    isClosing,
    isMounted,
    close,
  } = useModal({
    animationDelay: 300,
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [cl.opened]: isOpen,
    [cl.isClosing]: isClosing,
  }

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cl.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />
        <div
          className={cl.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
