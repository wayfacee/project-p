import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/theme';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    const userId = JSON.parse(
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    );

    if (!userId) {
      return rejectWithValue('User ID not found in localStorage');
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        response.features ? 'new' : 'old',
      );

      return response;
    } catch (e) {
      return rejectWithValue('error initAuthData');
    }
  },
);
