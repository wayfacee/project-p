import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
  text: '',
};

const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  // extraReducers: (builder) => {
  // builder
  //   .addCase(loginByUsername.pending, (state) => {
  //     state.error = '';
  //     state.isLoading = true;
  //   })
  //   .addCase(loginByUsername.fulfilled, (state) => {
  //     state.isLoading = false;
  //   })
  //   .addCase(loginByUsername.rejected, (state, action) => {
  //     // данные который возв. ассинк санк, попадают в экшен
  //     state.isLoading = false;
  //     state.error = action.payload as string;
  //   })
  // }
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
