import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fethcArticleById } from '../services/fethcArticleById/fethcArticleById';
import { Article } from '../types/article';

const initialState: ArticleDetailsSchema = {
  data: undefined,
  isLoading: false,
  error: undefined,
}

const articleDetailsSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fethcArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fethcArticleById.fulfilled, (
        state, action: PayloadAction<Article>
      ) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fethcArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
})

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;