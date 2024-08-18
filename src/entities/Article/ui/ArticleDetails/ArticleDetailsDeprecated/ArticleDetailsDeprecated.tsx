import * as cl from '../ArticleDetails/ArticleDetails.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import {
  TextAlign,
  Text as TextDeprecated,
  TextSize,
} from '@/shared/ui/deprecated/Text';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eyeD.svg';
import { renderArticleBlock } from '../ArticleDetails/renderArticleBlock';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';

interface ArticleDetailsDeprecatedProps {
  className?: string;
}

export const ArticleDetailsDeprecatedLoading = () => {
  return (
    <VStack gap='16' max>
      <SkeletonDeprecated
        className={cl.avatar}
        width={200}
        height={200}
        border="50%"
      />
      <SkeletonDeprecated className={cl.title} width={300} height={32} />
      <SkeletonDeprecated className={cl.skeleton} width={600} height={24} />
      <SkeletonDeprecated className={cl.skeleton} width="100%" height={200} />
      <SkeletonDeprecated className={cl.skeleton} width="100%" height={200} />
    </VStack>
  );
};

export const ArticleDetailsDeprecatedError = () => {
  const { t } = useTranslation();

  return (
    <TextDeprecated
      align={TextAlign.CENTER}
      text={t('Произошла ошибка при загрузке статьи')}
    />
  );
};

export const ArticleDetailsDeprecated = memo(
  (props: ArticleDetailsDeprecatedProps) => {
    const { className } = props;
    const article = useSelector(getArticleDetailsData);

    return (
      <>
        <HStack justify="center" max className={cl.avatarWrapper}>
          <AvatarDeprecated
            size={200}
            src={article?.img}
            className={cl.avatar}
          />
        </HStack>

        <VStack gap="4" max data-testid="ArticleDetails.Info">
          <TextDeprecated
            className={cl.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />

          <HStack gap="8">
            <IconDeprecated Svg={EyeIcon} className={cl.icon} />
            <TextDeprecated text={String(article?.views)} />
          </HStack>

          <HStack gap="8">
            <IconDeprecated Svg={CalendarIcon} className={cl.icon} />
            <TextDeprecated text={String(article?.createdAt)} />
          </HStack>
        </VStack>

        {article?.blocks.map(renderArticleBlock)}
      </>
    );
  },
);
