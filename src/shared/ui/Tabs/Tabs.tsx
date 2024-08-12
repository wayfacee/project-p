import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './Tabs.module.scss';
import { memo, ReactNode, useCallback } from "react";
import { Card, CardTheme } from "../Card/Card";

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className,
    tabs,
    value,
    onTabClick
  } = props;

  const clickHandle = useCallback((tab: TabItem) => {
    // сверху принимаем табАйтем, а из этой функц.
    // возв. другую функц, внутри которой вызваем онТабКлик
    return () => {
      onTabClick(tab);
    }
  }, [onTabClick]);

  return (
    <div className={classNames(cl.Tabs, {}, [className])}>
      {tabs.map(tab => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cl.tab}
          key={tab.value}
          onClick={clickHandle(tab)} // обычный онКлик принимает ивент,
          // а не таб, с помощью замыкания прокинули таб
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});