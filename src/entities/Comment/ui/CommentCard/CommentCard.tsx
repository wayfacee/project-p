import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './CommentCard.module.scss';
import { memo } from "react";
import { Comment } from "../../model/types/comment";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { VStack } from "shared/ui/Stack";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const {
    className,
    comment,
    isLoading
  } = props;

  if (isLoading) {
    return (
      <div className={classNames(cl.CommentCard, {}, [className, cl.loading])}>
        <div className={cl.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} className={cl.username} />
        </div>
        <Skeleton width='100%' height={50} />
      </div>
    )
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack max gap="8" className={classNames(cl.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cl.header}>
        {comment.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} className={cl.username} />
        ) : (
          null
        )}
        <Text className={cl.text} title={comment.user.username} />
      </AppLink>

      <Text className={cl.text} text={comment.text} />
    </VStack>
  );
});