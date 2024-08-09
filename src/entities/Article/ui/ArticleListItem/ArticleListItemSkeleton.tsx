import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './ArticleListItem.module.scss';
import { memo } from "react";
import { ArticleView } from "../../model/consts/consts";
import { Card } from "@/shared/ui/Card/Card";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
  const {
    className,
    view,
  } = props;

  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(cl.ArticleListItemSkeleton, {}, [className, cl[view]])}>
        <Card className={cl.card}>
          <div className={cl.header}>
            <Skeleton border="50%" width={30} height={30} />
            <Skeleton width={150} height={16} className={cl.username} />
            <Skeleton width={150} height={16} className={cl.date} />
          </div>

          <Skeleton width={250} className={cl.title} />
          <Skeleton height={200} className={cl.img} />

          <div className={cl.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={classNames(cl.ArticleListItemSkeleton, {}, [className, cl[view]])}>
      <Card className={cl.card}>
        <div className={cl.imageWrapper}>
          <Skeleton width={200} height={200} className={cl.img} />
        </div>

        <div className={cl.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>

        <Skeleton width={150} height={16} className={cl.title} />
      </Card>
    </div>
  );
});