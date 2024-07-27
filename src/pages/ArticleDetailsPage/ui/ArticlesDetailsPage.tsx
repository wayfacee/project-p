import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticlesDetailsPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleDetails } from "enteties/Article";
import { useParams } from "react-router-dom";

interface ArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage = ({ className }: ArticlesDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <div className={classNames(cl.ArticlesDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <div className={classNames(cl.ArticlesDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticlesDetailsPage);