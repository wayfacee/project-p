import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode, useCallback, useEffect } from 'react';
import { useAnimationLibs } from '../../../lib/components/AnimationProvider';
import { Overlay } from '../Overlay';
import * as cl from './Drawer.module.scss';
import { BeatLoader } from 'react-spinners';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Portal } from '@/widgets/Portal';
import { toggleFeatures } from '@/shared/lib/features';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
  const { Spring, Gesture } = useAnimationLibs();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const { theme } = useTheme();

  const { className, children, onClose, isOpen, lazy } = props;

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [api, isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose, // when resolve is true, drawer will onClose
    });
  };

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  if (!isOpen) {
    return null;
  }

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(cl.Drawer, {}, [
          className,
          theme,
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cl.drawerNew,
            off: () => cl.drawerOld,
          }),
        ])}
      >
        <Overlay onClick={close} />
        <Spring.a.div
          className={cl.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

export const Drawer = memo((props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return <BeatLoader color="#f48dff" />;
  }

  return <DrawerContent {...props} />;
});
