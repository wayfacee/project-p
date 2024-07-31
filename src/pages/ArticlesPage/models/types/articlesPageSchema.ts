import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entities/Article";

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;

  view: ArticleView;

  // pagination
  page: number;
  limit?: number;
  hasMore: boolean;

  // поле не измен. - то инитед называем.
  // меняется тока в момент иниц., потом руками менять
  // уже нельзя
  _inited: boolean;
}