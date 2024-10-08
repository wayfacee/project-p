import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { FC, memo } from 'react';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated 
 */
export const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  // [cl[theme]] - как динам. ключ обращ. к кл,
  // и как динам. свойство передаем тему, для того чтобы получить
  // то что сген

  return (
    <Link
      to={to}
      className={classNames(cl.AppLink, {}, [className, cl[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
