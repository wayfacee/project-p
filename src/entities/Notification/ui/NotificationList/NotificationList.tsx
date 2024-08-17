import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './NotificationList.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const {
    data: notifications,
    isLoading,
    error,
  } = useNotifications(null, {
    pollingInterval: 5000,
  });

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    return (
      <VStack
        gap="8"
        max
        className={classNames(cl.NotificationList, {}, [className])}
      >
        <Skeleton width={'100%'} border="8px" height={'80px'} />
        <Skeleton width={'100%'} border="8px" height={'80px'} />
        <Skeleton width={'100%'} border="8px" height={'80px'} />
      </VStack>
    );
  }

  return (
    <VStack
      gap="8"
      max
      className={classNames(cl.NotificationList, {}, [className])}
    >
      {notifications?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </VStack>
  );
});
