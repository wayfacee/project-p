import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleDetailsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationList } from '@/features/articleRecommendationList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';
import {
  getFeatureFlag,
  ToggleFeatures,
  toggleFeatures,
} from '@/shared/const/features';
import { Counter } from '@/entities/Counter';
import { Card } from '@/shared/ui/Card';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');

  // вылезает заглушка статья не найдена
  // иф убираем, а внутри комп. делаем не обяз.
  if (!id) {
    return (
      <Page className={classNames(cl.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    );
  }

  // чтобы не искать итп.:
  // const articleRatingCard = toggleFeatures({
  //   name: 'isArticleRatingEnabled',
  //   on: () => ,
  //   off: () => <Card>ddвапро</Card>,
  // });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAmount>
      <Page className={classNames(cl.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />

          <ArticleDetails id={id} />
          <ToggleFeatures
            feature="isArticleRatingEnabled"
            on={<ArticleRating articleId={id} />}
            off={<Card>вам это функц. еще не доступна!</Card>}
          />
          <ArticleRecommendationList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
