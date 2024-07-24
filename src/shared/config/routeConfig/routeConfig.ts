import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',

  NOT_FOUND = 'not_found',
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.NOT_FOUND]: '*'
}

interface RouteConfigProps {
  path: string;
  element: React.ComponentType;
}

export const routeConfig: RouteConfigProps[] = [
  { path: RoutePath.main, element: MainPage },
  { path: RoutePath.about, element: AboutPage },
  { path: RoutePath.profile, element: ProfilePage },
  { path: RoutePath.not_found, element: NotFoundPage },
];