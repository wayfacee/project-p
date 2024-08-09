import { UserRole } from "@/entities/User";
import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ArticleDetailsPage } from "@/pages/ArticleDetailsPage";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { ArcticlesPage } from "@/pages/ArticlesPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";

// расширяет дефолт просы, которые получаем из реакт роутер дом
// type AppRoutesProps = RouteProps & {
//   authOnly?: boolean;
// }


export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',

  NOT_FOUND = 'not_found',
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: '/profile/', // + :id
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
  [AppRoutes.ARTICLE_CREATE]: '/articles/new',
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
  [AppRoutes.ADMIN_PANEL]: '/admin',
  [AppRoutes.FORBIDDEN]: '/forbidden',

  [AppRoutes.NOT_FOUND]: '*'
}

export interface RouteConfigProps {
  path: string;
  element: React.ComponentType;
  authOnly?: boolean;
  roles?: UserRole[];
}

// МОЖНО БЫЛО ТСКС СДЕЛАТЬ, И REACTNODE
export const routeConfig: RouteConfigProps[] = [
  { path: RoutePath.main, element: MainPage },
  { path: RoutePath.about, element: AboutPage },
  { path: `${RoutePath.profile}:id`, element: ProfilePage, authOnly: true },
  { path: RoutePath.articles, element: ArcticlesPage, authOnly: true },
  { path: `${RoutePath.article_details}:id`, element: ArticleDetailsPage, authOnly: true },

  // можно сделать два стр, но эдит от создания отличаются каким-нибудь
  // загаловком, и можно переисп. один комп.
  { path: RoutePath.article_create, element: ArticleEditPage, authOnly: true },
  { path: RoutePath.article_edit, element: ArticleEditPage, authOnly: true },

  { path: RoutePath.admin_panel, element: AdminPanelPage, authOnly: true, roles: [UserRole.MANAGER, UserRole.ADMIN] },
  { path: RoutePath.forbidden, element: ForbiddenPage },

  { path: RoutePath.not_found, element: NotFoundPage },
];

// export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
//   [AppRoutes.MAIN]: {
//       path: RoutePath.main,
//       element: <MainPage />,
//   },
//   [AppRoutes.ABOUT]: {
//       path: RoutePath.about,
//       element: <AboutPage />,
//   },
//   [AppRoutes.PROFILE]: {
//       path: RoutePath.profile,
//       element: <ProfilePage />,,
//       authOnly: true,
//   },
//   // last
//   [AppRoutes.NOT_FOUND]: {
//       path: RoutePath.not_found,
//       element: <NotFoundPage />,
//   },
// };
