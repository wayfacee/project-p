import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './ArticleEditPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const {
    className
  } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  // если кординально отлич., то две стр. надо создавать
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cl.ArticleEditPage, {}, [className])}>
      {isEdit
        ? t('Редактировать статьи с ID = ') + id
        : t('Создание новое статьи')
      }
    </Page>
  );
});

export default ArticleEditPage;