export { articleDetailsReducer } from './model/slice/articleDetailsSlice';
export { getArticleDetailsData } from './model/selectors/articleDetails';
export {
  ArticleView,
  ArticleSortField,
  ArticleType,
  ArticleBlockType,
} from './model/consts/consts';
export { ArticleList } from './ui/ArticleList/ArticleList';
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
