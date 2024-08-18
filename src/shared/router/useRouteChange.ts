import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { AppRouteByPathPattern, AppRoutes } from '../const/router';

// будет слдеить за измен. маршрута, и возв. понятное название текущ. маршрута
export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    // проходимся по всем маршрутам которые есть.
    // паттерн - кусок пути, ид, артикл/:id | route - название
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      // 1) pattern 2) текущ. путь
      // если паттерн !== текущ. путь = то мы наход. в другой стр (налл)
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]);

  return appRoute;
}
