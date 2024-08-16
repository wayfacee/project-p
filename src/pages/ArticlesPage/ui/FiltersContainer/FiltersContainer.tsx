/**
 * прокидываем из стейта в аргументы, промеж. звено
 * среднее звено между стр - виджетом, чтоб пропсы из хука не дост. в стр.
 */

import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { memo } from 'react';
import { useArticleFilters } from '../../lib/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
  const {
    order,
    sort,
    search,
    type,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    onChangeType,
  } = useArticleFilters();

  return (
    <ArticlesFilters
      className={className}
      order={order}
      type={type}
      search={search}
      sort={sort}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
      onChangeSort={onChangeSort}
    />
  );
});
