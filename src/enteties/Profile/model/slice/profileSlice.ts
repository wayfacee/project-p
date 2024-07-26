import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../../services/updataProfileData/updataProfileData';

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
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.validateErrors = undefined;
      state.form = state.data;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    }
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
        // дата будет неизменяемой
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        // данные который возв. ассинк санк, попадают в экшен
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateProfileData.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (
        state, action: PayloadAction<Profile>
      ) => {
        state.isLoading = false;
        state.readonly = true;
        state.data = action.payload;
        state.form = action.payload;
        state.validateErrors = undefined;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      })
  },
})

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;