import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticlesPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ArticleList } from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {  articlesPageReducer, getArticles } from "../../models/slices/articlesPageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from "../../models/selectors/articlesPageSelectors";
import { Page } from "widgets/Page/Page";
import { fetchNextArticlesPage } from "../../models/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { Text } from "shared/ui/Text/Text";
import { initArticlesPage } from "../../models/services/initArticlesPage/initArticlesPage";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { useSearchParams } from "react-router-dom";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);
  // URLSearchParams:
  const [searchParams] = useSearchParams();


  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    // чтобы работало на две стороны, подставлялись парамсы
    dispatch(initArticlesPage(searchParams));
  });

  if (error) {
    return (
      <Text title='Some problems with server, try to refresh the page / (ArticlesPage)' />
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAmount={false}>
      {/* вернуться назад, и читать далее, + inited */}
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cl.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleList
          articles={articles}
          view={view}
          isLoading={isLoading}
          className={cl.list}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);