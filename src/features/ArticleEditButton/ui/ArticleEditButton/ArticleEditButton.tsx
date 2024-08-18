import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/redesigned/Button';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';

interface ArticleEditButtonProps {
  className?: string;
}

export const ArticleEditButton = memo((props: ArticleEditButtonProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();

  if (!article) return null;

  const onEditArticle = useCallback(() => {
    navigate(getRouteArticleEdit(article.id));
  }, [navigate, article?.id]);

  return (
    <Button className={className} onClick={onEditArticle}>
      {t('Редактировать')}
    </Button>
  );
});
