import * as cl from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

interface SidebarItemProps {
  // ? мб
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = ({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cl.item, { [cl.collapsed]: collapsed }, [])}
    >
      <item.Icon className={cl.icon} />

      <span className={cl.link}>{t(item.text)}</span>
    </AppLink>
  );
};
