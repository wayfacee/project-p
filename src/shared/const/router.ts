export enum AppRoutes {
  MAIN = 'main',
  SETTINGS = 'settings',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',

  NOT_FOUND = 'not_found',
}

// не удобно кд раз писать маршруты:
export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

// export const RoutePath: Record<AppRoutes, string> = {
//   [AppRoutes.MAIN]: getRouteMain(),
//   [AppRoutes.ABOUT]: getRouteAbout(),
//   [AppRoutes.PROFILE]: getRouteProfile(':id'), // + :id
//   [AppRoutes.ARTICLES]: getRouteArticles(),
//   [AppRoutes.ARTICLE_DETAILS]: getRouteArticleDetails(':id'), // + :id
//   [AppRoutes.ARTICLE_CREATE]: getRouteArticleCreate(),
//   [AppRoutes.ARTICLE_EDIT]: getRouteArticleEdit(':id'),
//   [AppRoutes.ADMIN_PANEL]: getRouteAdmin(),
//   [AppRoutes.FORBIDDEN]: getRouteForbidden(),

//   [AppRoutes.NOT_FOUND]: '*'
// };

// текущ. юрл/маршрут будет мапить в эти названия артиклес/дет. итд.
// ротуинги технически. смапить в роутинги семантические - названия
// 1) ключи 2) названия
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(':id')]: AppRoutes.PROFILE,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
