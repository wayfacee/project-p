import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNum } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

// подгруз. след. порц. данных
export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchNextArticlesPage',
  async (_, thunkAPI) => {
    const {
      getState,
      dispatch
    } = thunkAPI;
    const page = getArticlesPageNum(getState());
    const hasMore = getArticlesPageHasMore(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    // !isLoading - не отпр. запрос в момент загрз. данных
    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1));
      dispatch(fetchArticlesList({}));
    }
  },
);
