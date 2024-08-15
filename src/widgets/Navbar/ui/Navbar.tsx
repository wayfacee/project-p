import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Navbar.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/const/features';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <header className={classNames(cl.NavbarRedesigned, {}, [className])}>
            <HStack className={cl.actions} gap="16">
              <NotificationButton />

              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(cl.Navbar, {}, [className])}>
            <Text
              className={cl.appName}
              title={t('Ulbi TV App')}
              theme={TextTheme.INVETED}
            />
            <AppLink
              to={getRouteArticleCreate()}
              theme={AppLinkTheme.SECONDARY}
            >
              {t('Создать статью')}
            </AppLink>

            <HStack className={cl.actions} gap="16">
              <NotificationButton />

              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header className={classNames(cl.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cl.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
