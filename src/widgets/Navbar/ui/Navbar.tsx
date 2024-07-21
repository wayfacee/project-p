import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Navbar.module.scss'
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { LoginModal } from "features/AuthByUsername";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(cl.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR}
        className={cl.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>

      <LoginModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </div>
  );
};