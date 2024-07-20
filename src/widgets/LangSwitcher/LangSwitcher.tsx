import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    // i18n.lang. - получаем тек. ланг
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  }

  return (
    <Button
      className={classNames('cl.LangSwitcher', {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={toggle}
    >
      {t(short ? 'Короткий язык' : 'Язык')}
    </Button>
  )
};