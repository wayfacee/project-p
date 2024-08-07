import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text } from "shared/ui/Text/Text";
import { getArticles } from "../../models/slices/articlesPageSlice";
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from "../../models/selectors/articlesPageSelectors";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { initArticlesPage } from "../../models/services/initArticlesPage/initArticlesPage";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ArticleList } from "entities/Article";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const {
    className
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);
  // URLSearchParams:
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    // чтобы работало на две стороны, подставлялись парамсы
    dispatch(initArticlesPage(searchParams));
  });

  if (error) {
    return (
      <Text title={t('Some problems with server, try to refresh the page / (ArticlesPage)')} />
    )
  }

  return (
    <ArticleList
      articles={articles}
      view={view}
      isLoading={isLoading}
      className={className}
    />
  );
});