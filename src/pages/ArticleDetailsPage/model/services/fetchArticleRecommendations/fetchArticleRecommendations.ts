// rtk 

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticleRecommendations',
  async (_, thunkAPI) => {
    const {
      extra,
      rejectWithValue
    } = thunkAPI;

    try {


      const { data } = await extra.api.get<Article[]>(`/articles/`, {
        params: {
          _limit: 4
        }
      });

      if (!data) throw new Error('problem with fetchArticleRecommendations')

      return data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
