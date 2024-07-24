import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
  data: undefined,
  isLoading: false,
  error: undefined,
  readonly: true,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
  }
})

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;