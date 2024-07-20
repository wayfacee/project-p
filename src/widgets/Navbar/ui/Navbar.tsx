import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Navbar.module.scss'
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { Modal } from "widgets/Modal/Modal";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal(prev => !prev);
  }, [isAuthModal]);

  return (
    <div className={classNames(cl.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR}
        className={cl.links}
        onClick={onToggleModal}
      >
        {t('Войти')}
      </Button>

      <Modal isOpen={isAuthModal} onClose={onToggleModal}>

      </Modal>
    </div>
  );
};