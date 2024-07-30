import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetchArticlesList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (_, thunkAPI) => {
    const {
      extra,
      rejectWithValue
    } = thunkAPI;

    try {
      const { data } = await extra.api.get<Article[]>(`/articles/`, {
        params: {
          _expand: 'user' // чтобы отрис. аву юзера
        }
      });

      if (!data) throw new Error('problem with fethcProfileData')

      return data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
