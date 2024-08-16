import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './MainLayout.module.scss';
import { memo, ReactNode } from 'react';

// формирует главный коркас нашего прилож., на котором будет осн. все стр
// сайдбар хэдер райтбар, и с контент оцентр. частью

interface MainLayoutProps {
  className?: string;
  header: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
  toolbar?: ReactNode; // menu (of payment, settings, scroll etc.)
}

export const MainLayout = memo((props: MainLayoutProps) => {
  const { className, header, sidebar, content, toolbar } = props;

  return (
    <div className={classNames(cl.MainLayout, {}, [className])}>
      <div className={cl.content}>{content}</div>
      <div className={cl.sidebar}>{sidebar}</div>
      <div className={cl.rightbar}>
        <div className={cl.header}>{header}</div>
        <div className={cl.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
