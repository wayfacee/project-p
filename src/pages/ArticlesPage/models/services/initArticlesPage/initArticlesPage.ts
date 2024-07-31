import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

// подгруз. след. порц. данных
export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (_, thunkAPI) => {
    const {
      getState,
      dispatch
    } = thunkAPI;
    // нельзя исп. хуки
    const inited = getArticlesPageInited(getState());

    if (!inited) {
      // сначало иниц. лимит
      dispatch(articlesPageActions.initState());

      // и тока потом данные подгруз.:
      dispatch(fetchArticlesList({
        page: 1,
      }));
    }
  },
);
