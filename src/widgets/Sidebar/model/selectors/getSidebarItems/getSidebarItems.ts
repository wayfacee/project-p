import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { RoutePath } from "@/shared/const/router";
import { SidebarItemType } from "../../types/sidebar";
import MainIcon from '@/shared/assets/icons/main.svg';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';

// вытащить необход. данные из стейта,
// и сформировать массив айтемов

// чтоб мемо. селектор, они особо измен. не будут
export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
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
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.profile + userData?.id,
          text: 'Профиль',
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          text: 'Статьи',
          Icon: ArticlesIcon,
          authOnly: true,
        },
      );
    };
    return sidebarItemsList;
  }
);