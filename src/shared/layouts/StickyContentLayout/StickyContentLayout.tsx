import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  // тк будет детального просмотра статьи, там не будет левой части
  right?: ReactElement;
}

/**
 * когда листаешь элементы sticky
 */
export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, content, left, right } = props;

  return (
    <div className={classNames(cl.MainLayout, {}, [className])}>
      {left && <div className={cl.left}>{left}</div>}
      <div className={cl.content}>{content}</div>
      {right && <div className={cl.right}>{right}</div>}
    </div>
  );
});
