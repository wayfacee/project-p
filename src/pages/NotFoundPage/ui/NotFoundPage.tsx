import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <Page
      data-testid="NotFoundPage"
      className={classNames(cl.NotFoundPage, {}, [className])}
    >
      {t('Страница не найдена')}
    </Page>
  );
};