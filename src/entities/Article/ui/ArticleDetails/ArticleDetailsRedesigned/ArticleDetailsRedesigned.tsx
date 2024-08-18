import * as cl from './ArticleDetailsRedesigned.module.scss';
import * as commonCl from '../ArticleDetails/ArticleDetails.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/redesigned/Text';
import { renderArticleBlock } from '../ArticleDetails/renderArticleBlock';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';

interface ArticleDetailsRedesignedProps {
  className?: string;
}

export const ArticleDetailsRedesignedLoading = () => {
  return (
    <VStack gap='16' max>
      <Skeleton
        className={commonCl.avatar}
        width={200}
        height={200}
        border="50%"
      />
      <Skeleton className={commonCl.title} width={300} height={32} />
      <Skeleton className={commonCl.skeleton} width={600} height={24} />
      <Skeleton className={commonCl.skeleton} width="100%" height={200} />
      <Skeleton className={commonCl.skeleton} width="100%" height={200} />
    </VStack>
  );
};

export const ArticleDetailsRedesignedError = () => {
  const { t } = useTranslation();

  return (
    <Text align="center" text={t('Произошла ошибка при загрузке статьи')} />
  );
};

export const ArticleDetailsRedesigned = memo(
  (props: ArticleDetailsRedesignedProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const article = useSelector(getArticleDetailsData);

    return (
      <>
        <Text title={article?.title} size="l" bold />
        <Text title={article?.subtitle} />

        <AppImage
          fallback={<Skeleton width={'100%'} height={420} border="16px" />}
          src={article?.img}
          className={cl.img} // ограничим по высоте
        />

        {article?.blocks.map(renderArticleBlock)}
      </>
    );
  },
);
