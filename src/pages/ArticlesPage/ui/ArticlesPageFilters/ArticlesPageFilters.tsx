// можно было вынести в отдел. фичу, но это будет исп.
// только здесь, поэтому  создали здесь

import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticlesPageFilters.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView } from "../../models/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../models/slices/articlesPageSlice";
import { ArticleSortField, ArticlesSortSelector, ArticleType, ArticleTypeTabs, ArticleView } from "entities/Article";
import { ArticleViewSelector } from "features/ArticleViewSelector/ArticleViewSelector";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { SortOrder } from "shared/types";
import { fetchArticlesList } from "../../models/services/fetchArticlesList/fetchArticlesList";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import { TabItem, Tabs } from "shared/ui/Tabs/Tabs";

interface ArticlesPageFilterProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFilterProps) => {
  const {
    className
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const order = useSelector(getArticlesPageOrder);
  const sort = useSelector(getArticlesPageSort);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  // подгружаем данные
  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  // for search
  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder));
    // типо если мы в 10, и что то ввели, поиск будет в 10 стр.
    dispatch(articlesPageActions.setPage(1));

    // можно было сделать через useEffect, но надо от сайдЭффектов
    // избавлятся, чтоб не было лишних завис.
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  

  return (
    <div className={classNames(cl.ArticlesPageFilters, {}, [className])}>
      <div className={cl.sortWrapper}>
        <ArticlesSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector
          view={view}
          onViewClick={onChangeView}
        />
      </div>

      <Card className={cl.search}>
        <Input
          placeholder={t('Поиск')}
          value={search}
          onChange={onChangeSearch}
        />
      </Card>

      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cl.tabs}
      />
    </div>
  );
});