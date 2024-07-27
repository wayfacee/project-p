import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticlesDetailsPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo } from "react";

interface ArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage = ({ className }: ArticlesDetailsPageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.ArticlesDetailsPage, {}, [className])}>

    </div>
  );
};

export default memo(ArticlesDetailsPage);