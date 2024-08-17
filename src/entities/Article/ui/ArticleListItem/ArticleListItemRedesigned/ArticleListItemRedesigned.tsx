import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleListItemRedesigned.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleListItemProps } from '../ArticleListItem/ArticleListItem';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import {
  ArticleBlockType,
  ArticleView,
} from '@/entities/Article/model/consts/consts';
import { ArticleTextBlock } from '@/entities/Article/model/types/article';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteArticleDetails } from '@/shared/const/router';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const types = <Text text={article.type.join(', ')} className={cl.types} />;
  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cl.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        max
        padding="24"
        data-testid="ArticleListItem"
        className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            <Avatar size={32} src={article.user.avatar} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>

          <Text title={article.title} bold />
          <Text title={article.subtitle} bold size="s" />

          <AppImage
            fallback={<Skeleton width={'100%'} height={250} />}
            src={article.img}
            className={cl.img}
            alt={article.title}
          />

          {textBlock?.paragraphs && (
            <Text
              className={cl.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(' ')}
            />
          )}

          <HStack max justify="between">
            <AppLink to={getRouteArticleDetails(article.id)}>
              <Button value="outline">Читать далее...</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
    >
      <Card className={cl.card}>
        <div className={cl.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            src={article.img}
            alt={article.title}
            className={cl.img}
          />
          <Text text={article.createdAt} className={cl.date} />
        </div>

        <div className={cl.infoWrapper}>
          {types}
          {views}
        </div>

        <Text text={article.title} className={cl.title} />
      </Card>
    </AppLink>
  );
});
