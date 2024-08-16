import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticlesPageFilters.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/ArticlesSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { useArticleFilters } from '../../lib/useArticleFilters';

// можно было вынести в отдел. фичу, но это будет исп.
// только здесь, поэтому  создали здесь

interface ArticlesPageFilterProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFilterProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const {
    view,
    order,
    sort,
    search,
    type,
    onChangeView,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    onChangeType,
  } = useArticleFilters();

  return (
    <div className={classNames(cl.ArticlesPageFilters, {}, [className])}>
      <div className={cl.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
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
