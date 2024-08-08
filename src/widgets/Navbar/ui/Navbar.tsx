import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Navbar.module.scss'
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Avatar } from "shared/ui/Avatar/Avatar";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (authData) {
    return (
      <header className={classNames(cl.Navbar, {}, [className])}>
        <Text
          className={cl.appName}
          title={t('Ulbi TV App')}
          theme={TextTheme.INVETED}
        />
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
        >
          {t('Создать статью')}
        </AppLink>

        <Dropdown
          className={cl.dropdown}
          items={[
            ...(isAdminPanelAvailable ? [{
              content: t('Админка'),
              href: RoutePath.admin_panel,
            }] : []),
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id,
            },
            {
              content: t('Выйти'),
              onClick: onLogout,
            }
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
          direction={'bottom left'}
        />

        {authData && (
          <LoginModal
            isOpen={isAuthModal}
            onClose={onCloseModal}
          />
        )}

      </header>
    )
  }

  return (
    <header className={classNames(cl.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR}
        className={cl.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});