import { classNames, Mods } from "shared/lib/classNames/classNames";
import * as cl from './Avatar.module.scss';
import { CSSProperties, useMemo } from "react";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
  const mods: Mods = {};

  // (инлайн) стили объект - избегаем перерис. объекта
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    }
  }, [size]);

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cl.Avatar, mods, [className])}
    />
  );
};