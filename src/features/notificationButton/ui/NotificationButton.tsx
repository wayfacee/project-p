import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './NotificationButton.module.scss';
import { memo, useCallback, useState } from 'react';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import NotificationIconDeprecated from '@/shared/assets/icons/notificationD.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
import { ToggleFeatures } from '@/shared/const/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
      on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
    />
  );

  return (
    <>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Popover
              className={classNames(cl.NotificationButton, {}, [className])}
              direction={'bottom left'}
              trigger={trigger}
            >
              <NotificationList className={cl.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={classNames(cl.NotificationButton, {}, [className])}
              direction={'bottom left'}
              trigger={trigger}
            >
              <NotificationList className={cl.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>
      <MobileView>
        {trigger}
        <AnimationProvider>
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </AnimationProvider>
      </MobileView>
    </>
  );
});
