import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../../services/fetchProfileData/fetchProfileData';

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

  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (
        state, action: PayloadAction<Profile>
      ) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        // данные который возв. ассинк санк, попадают в экшен
        state.isLoading = false;
        state.error = action.payload;
      })
  },
})

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;