import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticlesPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ArticleList, ArticleView } from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageActions, articlesPageReducer, getArticles } from "../models/slices/articlesPageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticlesList } from "../models/services/fetchArticlesList/fetchArticlesList";
import { useSelector } from "react-redux";
import { getArticlesPageError, getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNum, getArticlesPageView } from "../models/selectors/articlesPageSelectors";
import { ArticleViewSelector } from "features/ArticleViewSelector/ArticleViewSelector";
import { Page } from "shared/ui/Page/Page";
import { fetchNextArticlesPage } from "../models/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { Text } from "shared/ui/Text/Text";

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

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    // сначало иниц. лимит
    dispatch(articlesPageActions.initState());

    // и тока потом данные подгруз.:
    dispatch(fetchArticlesList({
      page: 1,
    }));
  });

  if (error) {
    return (
      <Text title='Some problems with server, try to refresh the page / (ArticlesPage)' />
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cl.ArticlesPage, {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList
          articles={articles}
          view={view}
          isLoading={isLoading}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);