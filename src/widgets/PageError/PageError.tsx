import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './PageError.module.scss';
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";

interface PageErrorProps {
  className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  function reloadPage() {
    location.reload();
  };

  return (
    <div className={classNames(cl.PageError, {}, [className])}>
      {t('Произошла непредвиденная ошибка')}
      <Button onClick={reloadPage}>
        {t('Обновить страницу')}
      </Button>
    </div>
  );
};