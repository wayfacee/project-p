import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cl from './Avatar.module.scss';
import { CSSProperties, useMemo } from 'react';
import { AppImage } from '../AppImage';
import UserIcon from '@/shared/assets/icons/user.svg';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton/Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated 
 */
export const Avatar = ({
  className,
  src,
  size = 100,
  alt,
  fallbackInverted,
}: AvatarProps) => {
  const mods: Mods = {};

  // (инлайн) стили объект - избегаем перерис. объекта
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cl.Avatar, mods, [className])}
    />
  );
};
