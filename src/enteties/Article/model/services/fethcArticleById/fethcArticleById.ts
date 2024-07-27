import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fethcArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
  'articleDetails/fethcArticleById',
  async (articleId, thunkAPI) => {
    const {
      extra,
      rejectWithValue
    } = thunkAPI;

    try {
      const { data } = await extra.api.get<Article>(`/articles/${articleId}`);

      if (!data) throw new Error('problem with fethcProfileData')

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
