import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticleList.module.scss';
import { HTMLAttributeAnchorTarget, memo } from "react";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

// разгрузили комп.
const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cl.card} key={index} view={view} />
  ));

// не будем завязываться на какой то стейт не будем,
// статьи будем приним. из вне, тип не тока на стр. со списком
// но и как рек. будет когда читаешь одну статью

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target,
  } = props;
  const { t } = useTranslation();

  // целиком замен. на скелетоны, поэтому надо под конец
  // добавить - исЛоадинг
  // иначе будут скачки
  // так же ошибка в setAll => addMany

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        target={target}
        className={cl.card}
        article={article}
        view={view}
        key={article.id}
      />
    )
  }

  // если статьей нет:
  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдена')} />
      </div>
    )
  }

  return (
    <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});