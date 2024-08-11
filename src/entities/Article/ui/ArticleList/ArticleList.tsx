/* eslint-disable react/jsx-indent */
import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './ArticleList.module.scss';
import { HTMLAttributeAnchorTarget, memo } from "react";
import { Article } from "../../model/types/article";
import { ArticleView } from "@/entities/Article/model/consts/consts";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  // вирт. сделали условной 
}

// ЛУЧШЕ ИСП. ДРУГУЮ ЛИБУ + ПРАКТИКА 

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

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдена')} />
      </div>
    )
  }

  return (
    <div
      className={classNames(cl.ArticleList, {}, [className, cl[view]])}
    >
      {articles.map(item => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
          className={cl.card}
        />
      ))}

      {isLoading && getSkeletons(view)}
    </div>
  )
});