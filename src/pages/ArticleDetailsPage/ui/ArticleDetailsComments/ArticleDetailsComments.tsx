import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Text, TextSize } from "shared/ui/Text/Text";
import { AddCommentForm } from "features/addCommentForm";
import { CommentList } from "entities/Comment";
import { useSelector } from "react-redux";
import { getArticleComments } from "../../model/slices/articleDetailsCommentSlice";
import { getArticleCommentsError, getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "shared/ui/Stack";

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

// comment list + addCommentform - оч переисп. 
// нужно было сделать addCommentform - энтети
// и переисп. формой была бы
// и чтоб отделить от стр. статьи то мы сделали фичу AddComments + commentlist
// и просто в ArticleDetailsPage исп. ArticelComments, но
// addCommentForm уже фича, и фичу фичей не можем исп.
// мы на ур. стр. создадим ArticleDetailsComments
// чтоб фичу фичей не исп.

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const {
    className,
    id,
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // selector создавать не над, но для кастомных над (еррор, лоад)
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const commentsError = useSelector(getArticleCommentsError);

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);


  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  return (
    <VStack gap="16" max
      className={classNames('', {}, [className])}
    >
      <Text
        size={TextSize.L}
        title={t('Комментарии')}
      />
      <AddCommentForm
        onSendComment={onSendComment}
      />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </VStack>
  );
});