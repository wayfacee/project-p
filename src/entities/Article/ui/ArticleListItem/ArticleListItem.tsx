import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './ArticleListItem.module.scss';
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { Article, ArticleTextBlock } from "../../model/types/article";
import { ArticleView, ArticleBlockType } from "@/entities/Article";
import { Text } from "@/shared/ui/Text/Text";
import { Icon } from "@/shared/ui/Icon/Icon";
import EyeIcon from '@/widgets/assets/icons/eye.svg';
import { Card } from "@/shared/ui/Card/Card";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { RoutePath } from "@/shared/const/router";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { AppImage } from "@/shared/ui/AppImage";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target
  } = props;
  const { t } = useTranslation();

  // если нажать средней кнопкой мыши, то не откроется, доступность терям
  // const onOpenArticle = useCallback(() => {
  //   navigate(`${RoutePath.article_details}${article.id}`);
  // }, [navigate, article.id]);

  const types = <Text text={article.type.join(', ')} className={cl.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cl.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      block => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock; // чтоб с типами все ок

    return (
      <div className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}>
        <Card className={cl.card}>
          <div className={cl.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cl.username} />
            <Text text={article.createdAt} className={cl.date} />
          </div>

          <Text title={article.title} className={cl.title} />
          {types}
          <AppImage
            fallback={<Skeleton width={'100%'} height={250} />}
            src={article.img}
            className={cl.img}
            alt={article.title}
          />

          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cl.textBlock} />
          )}

          <div className={cl.footer}>
            <AppLink to={`${RoutePath.article_details}${article.id}`}>
              <Button
                theme={ButtonTheme.OUTLINE}
              >
                Читать далее...
              </Button>
            </AppLink>


            {views}
          </div>
        </Card>
      </div>
    )

  }

  return (
    <AppLink
      target={target}
      to={`${RoutePath.article_details}${article.id}`}
      className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
    >
      <Card className={cl.card} >
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