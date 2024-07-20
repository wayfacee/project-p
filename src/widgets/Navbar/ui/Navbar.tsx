import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Navbar.module.scss'

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cl.Navbar, {}, [className])}>
      <div className={cl.links}>
        \
      </div>
    </div>
  );
};