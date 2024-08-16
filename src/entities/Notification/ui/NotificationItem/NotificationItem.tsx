import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './NotificationItem.module.scss';
import { memo } from 'react';
import { Notification } from '../../model/types/notification';
import {
  Card as CardDeprecated,
  CardTheme,
} from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { ToggleFeatures } from '@/shared/const/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, notification } = props;

  // некоторые нотиф. будут иметь сс.
  const content = (
    <Card
      variant="outlined"
      className={classNames(cl.NotificationItem, {}, [className])}
    >
      <Text title={notification.title} text={notification.description} />
    </Card>
  );

  if (notification.href) {
    return (
      <AppLink
        className={cl.link} // чтобы вся область была кликабл.
        to={notification.href}
        target="_blank"
      >
        {content}
      </AppLink>
    );
  }

  return content;
});
