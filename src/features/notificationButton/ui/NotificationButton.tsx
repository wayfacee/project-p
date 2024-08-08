import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './NotificationButton.module.scss';
import { memo } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import NotificationIcon from 'widgets/assets/icons/notification.svg';
import { Popover } from "shared/ui/Popups";
import { Icon } from "shared/ui/Icon/Icon";
import { NotificationList } from "entities/Notification";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const {
    className
  } = props;

  return (
    <Popover
      className={classNames(cl.NotificationButton, {}, [className])}
      direction={'bottom left'}
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}>
      <NotificationList className={cl.notifications} />
    </Popover>
  );
});