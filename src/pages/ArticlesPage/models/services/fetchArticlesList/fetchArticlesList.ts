import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
  // for addMany or setAll
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;

  // getState - чтобы передать в селектор. актуальный стейт
  const limit = getArticlesPageLimit(getState());
  const page = getArticlesPageNum(getState());

  // можем так же принимать данные аргументом / пропсом
  const order = getArticlesPageOrder(getState());
  const sort = getArticlesPageSort(getState());
  const search = getArticlesPageSearch(getState());
  const type = getArticlesPageType(getState());

  try {
    // можно лимит не перед., пошта он фиксированный
    addQueryParams({
      sort,
      order,
      search,
      type,
    });

    const { data } = await extra.api.get<Article[]>(`/articles/`, {
      params: {
        _expand: 'user', // чтобы отрис. аву юзера
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        // чтобы вернул все типы, сли уже Алл
        type: type === ArticleType.ALL ? undefined : type,
      },
    });

    if (!data) throw new Error('problem with fethcProfileData');

    return data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
