import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './CommentList.module.scss';
import { memo } from "react";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../model/types/comment";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

// комменты могут быть к профилю, к товару итд.
// поэтому комм. принимаем из вне. не важно где хранится
// чтоб комп. со списком был переисп.
export const CommentList = memo((props: CommentListProps) => {
  const {
    className,
    comments,
    isLoading
  } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map(comment => (
          <CommentCard key={comment.id} isLoading={isLoading} className={cl.comment} comment={comment} />
        ))
      ) : (
        <Text title={t('Комментарии отсутствуют')} />
      )}
    </div>
  );
});