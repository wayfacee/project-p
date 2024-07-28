import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails";
import { Comment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>>
  (
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
      const {
        extra,
        dispatch,
        rejectWithValue,
        getState,
      } = thunkAPI;

      const userData = getUserAuthData(getState());
      // зависим от модуля аддКоммФорм, поэтому принимаем как пропс (string)
      // const text = getaddCommentFormText(getState());
      // зависим от артикла, но мы не хотим так!
      const article = getArticleDetailsData(getState());

      if (!userData || !text || !article) {
        return rejectWithValue('no data');
      }

      try {
        const response = await extra.api.post<Comment>('/comments', {
          articleId: article.id,
          userId: userData.id,
          text,
        });

        if (!response.data) {
          throw new Error();
        }

        // dispatch(addCommentFormActions.setText(''));

        // не обнов. интерфейс после отпр.
        // либо добав. в стейт, то что вернул сервак
        // либо просто заново отпр. запрос, и зпрос. обнов. комм.
        dispatch(fetchCommentsByArticleId(article.id));

        return response.data;
      } catch (e) {
        return rejectWithValue('error');
      }
    },
  );
