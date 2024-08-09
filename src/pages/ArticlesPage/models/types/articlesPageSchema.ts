import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleSortField, ArticleType, ArticleView } from "@/entities/Article";
import { SortOrder } from "@/shared/types";

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;
  
  // pagination
  page: number;
  limit?: number;
  hasMore: boolean;
  
  // filters - лучше бы в отдел. фичу
  view: ArticleView;
  order: SortOrder; // порядок сортировки
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  // поле не измен. - то инитед называем.
  // меняется тока в момент иниц., потом руками менять
  // уже нельзя
  _inited: boolean;
}