import { SVGProps, VFC } from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from 'widgets/assets/icons/main.svg';
import AboutIcon from 'widgets/assets/icons/about.svg';
import ProfileIcon from 'widgets/assets/icons/profile.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная страница',
    Icon: MainIcon,
  },
  {
    path: RoutePath.about,
    text: 'О сайте',
    Icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    text: 'Profile',
    Icon: ProfileIcon,
    authOnly: true,
  },
]