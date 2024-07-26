import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

// расширяет дефолт просы, которые получаем из реакт роутер дом
type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

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

// export const routeConfig: RouteConfigProps[] = [
//   { path: RoutePath.main, element: MainPage },
//   { path: RoutePath.about, element: AboutPage },
//   { path: RoutePath.profile, element: ProfilePage },
//   { path: RoutePath.not_found, element: NotFoundPage },
// ];

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
      path: RoutePath.main,
      element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
      path: RoutePath.about,
      element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
      path: RoutePath.profile,
      element: <ProfilePage />,,
      authOnly: true,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
  },
};
