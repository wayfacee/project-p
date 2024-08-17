import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Sidebar.module.scss';
import { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/const/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  // перерисовывается род комп., если добавим счетчик
  // поэтому в юзмемо, но для компов хук исп. нет нужды
  // пошта есть memo - будет сравнивать пропсы, если пропсы
  // не измен. то перерис. не произойдет.
  // 90% комп. надо оборач в мемо

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList],
  );

  // если хотим сделать декомп. sidebarDeprecated / Redesigned
  // или прямо в файле, если комп. большой - то декомп.
  // а если маленький то не надо

  // menu устарело
  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cl.SidebarRedesigned,
        { [cl.collapsedRedesigned]: collapsed },
        [className],
      )}
    >
      <AppLogo size={collapsed ? 30 : 50} className={cl.appLogo} />
      <VStack role="navigation" gap="8" className={cl.items}>
        {itemsList}
      </VStack>

      <Icon
        data-testid="sidebar-toggle"
        Svg={ArrowIcon}
        clickable
        onClick={onToggle}
        className={cl.collapsedBtn}
      />

      <div className={cl.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cl.lang} />
      </div>
    </aside>
  );
});
