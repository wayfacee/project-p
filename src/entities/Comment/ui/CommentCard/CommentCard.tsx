import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './CommentCard.module.scss';
import { memo } from 'react';
import { Comment } from '../../model/types/comment';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

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
        className={classNames(cl.CommentCard, {}, [className, cl.loading])}
        data-testid="CommentCard.Loading"
      >
        <div className={cl.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} className={cl.username} />
        </div>
        <Skeleton width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <VStack
          max
          gap="8"
          className={classNames(cl.CommentCard, {}, [className])}
          data-testid="CommentCard.Content"
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className={cl.header}
          >
            {comment.user.avatar ? (
              <AvatarDeprecated
                size={30}
                src={comment.user.avatar}
                className={cl.username}
              />
            ) : null}
            <TextDeprecated className={cl.text} title={comment.user.username} />
          </AppLinkDeprecated>

          <TextDeprecated className={cl.text} text={comment.text} />
        </VStack>
      }
      on={
        <Card padding="24" border="round">
          <VStack
            max
            gap="8"
            className={classNames(cl.CommentCardRedesigned, {}, [className])}
            data-testid="CommentCard.Content"
          >
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap="8">
                {comment.user.avatar ? (
                  <Avatar size={30} src={comment.user.avatar} />
                ) : null}
                <Text bold text={comment.user.username} />
              </HStack>
            </AppLink>

            <Text text={comment.text} />
          </VStack>
        </Card>
      }
    />
  );
});
