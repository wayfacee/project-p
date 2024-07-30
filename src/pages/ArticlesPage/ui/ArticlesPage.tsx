import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticlesPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Article, ArticleList, ArticleView } from "entities/Article";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation('article');

  return (
    <div className={classNames(cl.ArticlesPage, {}, [className])}>
      <ArticleList articles={[]} view={ArticleView.BIG} />
    </div>
  );
};

export default memo(ArticlesPage);