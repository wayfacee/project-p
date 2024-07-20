import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Sidebar.module.scss';
import { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from 'widgets/assets/icons/main.svg';
import AboutIcon from 'widgets/assets/icons/about.svg';


interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }
  console.log(cl);

  return (
    <div
      data-testid='sidebar'
      className={classNames(cl.Sidebar, { [cl.collapsed]: collapsed }, [className])}
    >
      <Button
        data-testid='sidebar-toggle'
        onClick={onToggle}
        className={cl.collapsedBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>

      <div className={cl.items}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
          className={cl.item}
        >
          <MainIcon className={cl.icon} />

          <span className={cl.link}>
            {t('Главная страница')}
          </span>
        </AppLink>

        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.about}
          className={cl.item}
        >
          <AboutIcon className={cl.icon} />

          <span className={cl.link}>
            {t('О сайте')}
          </span>
        </AppLink>
      </div>

      <div className={cl.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cl.lang} />
      </div>
    </div >
  );
};