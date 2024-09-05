import { AppRoutes } from "@/shared/const/router";
import { useRouteChange } from "@/shared/router/useRouteChange";
import { ScrollToolbar } from "@/widgets/ScrollToolbar";
import { ReactElement } from "react";

// в завис. от той стр. которая открыта, выбирать тулбар который будет исп.
export function useAppToolbar() {
  // будет слдеить за измен. маршрута, и возв. понятное название текущ. маршрута
  const appRoute = useRouteChange();

  // в завис. от роута, будет возв. нужный тулбар
  // OptionalRecord - для некоторых стр. не будет совсем
  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  }
  
  return toolbarByAppRoute[appRoute];
}

// если на разных стр. исп. разные хедеры / сайбары 
// вы точно так же создаете такой хук, делаете сопост. стр = компонент
// и исп. вот эту схему