import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as cl from './AdditionallInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';
// задаем стили не в ArticleAdditionalInfo, а в конейтере, и это норм

// мб надо будет прокидывать данные, чтоб стр была макс. тонкой
export const AdditionallInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();

  if (!article) return null;

  // надо было ARTICLEEDITBUTTON СОЗДАТЬ!! и исп в двух местах (артиклхедер)
  const onEditArticle = useCallback(() => {
    navigate(getRouteArticleEdit(article.id));
  }, [navigate, article.id]);

  return (
    <Card padding="24" border="round" className={cl.card}>
      {/** внутри не обороч. на кард, чтобы был переисп */}
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        key={article.id}
      />
    </Card>
  );
});
