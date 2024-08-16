import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

// не надо будет импорт енамы, просто передаем как строку
// variant - чтоб небыло пересич. с theme
export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    to,
    className,
    children,
    variant = 'primary',
    activeClassName = '',
    ...otherProps
  } = props;

  // [cl[theme]] - как динам. ключ обращ. к кл,
  // и как динам. свойство передаем тему, для того чтобы получить
  // то что сген

  return (
    // navlink - подерживает состояние актив,
    // можем вот так в класснейм передать каллбэк
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(cl.AppLink, { [activeClassName]: isActive }, [
          className,
          cl[variant],
        ])
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
