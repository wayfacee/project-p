import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Skeleton.module.scss';
import { CSSProperties, memo } from 'react';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated 
 */
export const Skeleton = memo((props: SkeletonProps) => {
  const { className, border, height, width } = props;

  // styles мемо. тут не особо надо, пошта перерис. скелетона
  // не так страшны, тока на этапе загрузки
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div
      className={classNames(cl.Skeleton, {}, [className])}
      style={styles}
    ></div>
  );
});
