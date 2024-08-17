import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    // i18n.lang. - получаем тек. ланг
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  // тут можно не делать декомп., а в сайдар итд надо
  return (
    <Button variant="clear" onClick={toggle}>
      {t(short ? 'Короткий язык' : 'Язык')}
    </Button>
  );
});
