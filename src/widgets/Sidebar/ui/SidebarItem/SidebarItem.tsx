import * as cl from './SidebarItem.module.scss';
import { useTranslation } from "react-i18next";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SidebarItemType } from '../../model/items';
import { classNames } from 'shared/lib/classNames/classNames';

interface SidebarItemProps {
  item?: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = ({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation()

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cl.item, { [cl.collapsed]: collapsed }, [])}
    >
      <item.Icon className={cl.icon} />

      <span className={cl.link}>
        {t(item.text)}
      </span>
    </AppLink>
  );
};