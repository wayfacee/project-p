import { createSelector } from "@reduxjs/toolkit";
import { getArticleDetailsData } from "@/entities/Article";
import { getUserAuthData } from "@/entities/User";

// начали получать инфу а юзере + про артикл внутри самого
// компонента, поэтому можем сделать селектор

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }

    // не уверенны, что вернется фулл инфа о юзере,
    // поэтому добавляем куери в fetchArticleById - _expand
    return article.user.id === user.id;
  }
)