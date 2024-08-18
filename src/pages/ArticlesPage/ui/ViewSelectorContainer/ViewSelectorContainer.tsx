/**
 * containerComponent - достает какие-то данные из стейта,
 * опред. какие-то actions, и прокидывает в комп., скажем так дочерний
 * у нас экшен для перекл. вида, и прокаидывает их в доч. комп.
 * (ArticleViewSelector - она работает на ур. пропсов, что переадется внутри обрабат.)
 */

import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { memo } from 'react';
import { useArticleFilters } from '../../lib/useArticleFilters';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo(
  (props: ViewSelectorContainerProps) => {
    const { className } = props;
    const { view, onChangeView } = useArticleFilters();

    return (
      <ArticleViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  },
);
