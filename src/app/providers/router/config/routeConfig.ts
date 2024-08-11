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
import { RoutePath } from "@/shared/const/router";


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
