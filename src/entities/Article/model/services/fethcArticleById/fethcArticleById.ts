import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fethcArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>(
  'articleDetails/fethcArticleById',
  async (articleId, thunkAPI) => {
    const {
      extra,
      rejectWithValue
    } = thunkAPI;

    try {
      if (!articleId) {
        throw new Error('Ошибка в fethcArticleById')
      }

      const { data } = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: {
          _expand: 'user', // вернет фулл инфу о юзере
        }
      });

      if (!data) throw new Error('problem with fethcProfileData')

      return data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
