import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './LoginForm.module.scss';
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cl.LoginForm, {}, [className])}>
      <Input
        autoFocus
        type="text"
        className={cl.input}
        placeholder={t('Введите username')}
      />
      <Input
        type="text"
        className={cl.input}
        placeholder={t('Введите пароль')}
      />
      <Button className={cl.loginBtn}>
        {t("Войти")}
      </Button>
    </div>
  );
};