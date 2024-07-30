import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticleListItem.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from "../../model/types/article";
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIcon from 'widgets/assets/icons/eye.svg';
import { Card } from "shared/ui/Card/Card";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article.id}`);
  }, [navigate, article.id]);

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
          <img src={article.img} className={cl.img} alt={article.title} />

          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cl.textBlock} />
          )}

          <div className={cl.footer}>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onOpenArticle}
            >
              {t('Читать далее...')}
            </Button>

            {views}
          </div>
        </Card>
      </div>
    )

  }

  return (
    <div className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}>
      <Card className={cl.card} onClick={onOpenArticle}>
        <div className={cl.imageWrapper}>
          <img src={article.img} alt={article.title} className={cl.img} />
          <Text text={article.createdAt} className={cl.date} />
        </div>

        <div className={cl.infoWrapper}>
          {types}
          {views}
        </div>

        <Text text={article.title} className={cl.title} />
      </Card>
    </div>
  );
});