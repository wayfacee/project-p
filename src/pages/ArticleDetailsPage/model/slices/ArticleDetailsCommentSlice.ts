import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const commentsAdapter = createEntityAdapter<Comment, string>({
  // поле по которому будет идти нормализ.
  selectId: (comment) => comment.id,
});

// get selectors
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  // возв. дефолт стейт (иннишал стейт)
  (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
)

const articleDetailsCommentSlice = createSlice({
  name: 'articleDetailsCommentSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (
        state, action: PayloadAction<Comment[]>
      ) => {
        state.isLoading = false;
        // setAll/ deleteMany etc. 1) state 2) datas that we wanna add
        // сам нормализирует данные, сам добавит энтити / ид
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentSlice;