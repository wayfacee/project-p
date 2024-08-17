import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleDetails.module.scss';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice';
import { memo, useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fethcArticleById } from '../../../model/services/fethcArticleById/fethcArticleById';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';
import {
  Text as TextDeprecated,
  TextAlign,
} from '@/shared/ui/deprecated/Text/Text';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleDetailsDeprecated, ArticleDetailsDeprecatedError, ArticleDetailsDeprecatedLoading } from '../ArticleDetailsDeprecated/ArticleDetailsDeprecated';
import { ArticleDetailsRedesigned } from '../ArticleDetailsRedesigned/ArticleDetailsRedesigned';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

// изолировали полностью стейт, редюсеры, подгружаем сущ. по ид
// этот комп. не предназнач. для переисп., зависит от ид статьи
// наружу ниче не выходит
export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation('article-details');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fethcArticleById(id));
    }
  }, [dispatch, id]);

  // из динамик модуль лоадер:
  let content;
  if (isLoading) {
    content = <ArticleDetailsDeprecatedLoading />;
  } else if (error) {
    content = <ArticleDetailsDeprecatedError />;
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ArticleDetailsRedesigned />}
        off={<ArticleDetailsDeprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAmount>
      <VStack
        max
        gap="16"
        className={classNames(cl.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
