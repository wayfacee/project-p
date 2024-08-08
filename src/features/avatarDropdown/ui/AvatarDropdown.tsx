import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";
import { Dropdown } from "shared/ui/Popups";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const {
    className
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) return null;

  return (
    <Dropdown
      className={classNames('', {}, [className])}
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
  );
});