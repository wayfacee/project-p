import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleDetailsRedesigned.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { renderArticleBlock } from '../ArticleDetails/renderArticleBlock';
import { TextSize } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ArticleDetailsRedesignedProps {
  className?: string;
}

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
