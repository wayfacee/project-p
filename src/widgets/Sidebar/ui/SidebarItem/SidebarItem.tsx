import * as cl from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';


import { SidebarItemType } from '../../model/types/sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
      to={item.path}
      className={classNames(
        cl.itemRedesigned,
        { [cl.collapsedRedesigned]: collapsed },
        [],
      )}
      activeClassName={cl.active}
    >
      <Icon Svg={item.Icon} />

      <span className={cl.link}>{t(item.text)}</span>
    </AppLink>
  );
};
