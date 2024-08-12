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
import { getRouteAbout, getRouteAdmin, getRouteArticleCreate, getRouteArticleDetails, getRouteArticleEdit, getRouteArticles, getRouteForbidden, getRouteMain, getRouteProfile } from "@/shared/const/router";


export interface RouteConfigProps {
  path: string;
  element: React.ComponentType;
  authOnly?: boolean;
  roles?: UserRole[];
}
// МОЖНО БЫЛО ТСКС СДЕЛАТЬ, И REACTNODE

export const routeConfig: RouteConfigProps[] = [
  { path: getRouteMain(), element: MainPage },
  { path: getRouteAbout(), element: AboutPage },
  { path: getRouteProfile(':id'), element: ProfilePage, authOnly: true },
  { path: getRouteArticles(), element: ArcticlesPage, authOnly: true },
  { path: getRouteArticleDetails(':id'), element: ArticleDetailsPage, authOnly: true },

  // можно сделать два стр, но эдит от создания отличаются каким-нибудь
  // загаловком, и можно переисп. один комп.
  { path: getRouteArticleCreate(), element: ArticleEditPage, authOnly: true },
  { path:getRouteArticleEdit(':id'), element: ArticleEditPage, authOnly: true },

  { path: getRouteAdmin(), element: AdminPanelPage, authOnly: true, roles: [UserRole.MANAGER, UserRole.ADMIN] },
  { path: getRouteForbidden(), element: ForbiddenPage },

  { path: '*', element: NotFoundPage },
];
