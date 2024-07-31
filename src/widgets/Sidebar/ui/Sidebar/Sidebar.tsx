import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Sidebar.module.scss';
import { memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "widgets/Sidebar/model/selectors/getSidebarItems/getSidebarItems";


interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed(prev => !prev)
  };

  // перерисовывается род комп., если добавим счетчик
  // поэтому в юзмемо, но для компов хук исп. нет нужды
  // пошта есть memo - будет сравнивать пропсы, если пропсы
  // не измен. то перерис. не произойдет.
  // 90% комп. надо оборач в мемо

  const itemsList = useMemo(() => (
    sidebarItemsList.map((item) => (
      <SidebarItem
        item={item}
        collapsed={collapsed}
        key={item.path}
      />
    ))
  ), [collapsed, sidebarItemsList]);

  return (
    <menu
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
        {itemsList}
      </div>

      <div className={cl.switchers}>
        {/* зем, ланг свитчер тож перерис. */}
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cl.lang} />
      </div>
    </menu>
  );
});