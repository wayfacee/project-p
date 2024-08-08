// лучше было бы в фичах 

import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticlesSortSelector.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { ArticleSortField } from "entities/Article/model/consts/consts";
import { SortOrder } from "shared/types";

interface ArticlesSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  onChangeSort: (newSort: ArticleSortField) => void;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticlesSortSelector = memo((props: ArticlesSortSelectorProps) => {
  const {
    className,
    order,
    onChangeOrder,
    sort,
    onChangeSort
  } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('возрастанию')
    },
    {
      value: 'desc',
      content: t('убыванию')
    }
  ], [t]);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('дате создания')
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию')
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('просмотрам')
    }
  ], [t]);

  // НЕ НАДР ТАК ДЕЛАТЬ, кастуем, тс ругается 
  // const onChangeSortHandler = useCallback((newSort: string) => {
  //   onChangeSort(newSort as ArticleSortField)
  // }, [onChangeSort]);

  // const onChangeOrderHandler = useCallback((newOrder: string) => {
  //   onChangeOrder(newOrder as SortOrder);
  // }, [onChangeOrder]);

  return (
    <div className={classNames(cl.ArticlesSortSelector, {}, [className])}>
      <Select<ArticleSortField> // если хотим явно указать генерик
        options={sortFieldOptions}
        label={t('Сортировать ПО')}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        className={cl.order}
        options={orderOptions}
        label={t('по')}
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  );
});