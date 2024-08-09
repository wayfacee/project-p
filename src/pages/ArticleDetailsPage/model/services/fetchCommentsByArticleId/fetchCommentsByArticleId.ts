import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Comment } from "@/entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  // тк ид - мб андефайнд
  string | undefined,
  ThunkConfig<string>
>(
  'articleDetails/fetchCommentsByArticleId',
  async (articleId, thunkAPI) => {
    const {
      extra,
      rejectWithValue
    } = thunkAPI;

    if (!articleId) {
      return rejectWithValue('error');
    }

    try {
      // json fake api => relationships (как получать сущ. по внеш. ключам)
      // article - является род. ресурсом (_expand), для доч - _embed
      const { data } = await extra.api.get<Comment[]>(`/comments/`, {
        params: {
          articleId, // id статьи
          _expand: 'user' // указ. юзера, пошта по ид польз.
          // получ. полную инфу о нем 
          // (userId - но мы хотим получ фулл инфу, поэтому делаем экспенд)
        }
      });

      if (!data) throw new Error('problem with fethcProfileData')

      return data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
