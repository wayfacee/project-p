import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    const userId = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) || '');

    if (!userId) throw new Error('initAuthData userData');

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      // if (!response) {
      // throw new Error('initAuthData response');
      // }

      return response;
    } catch (e) {
      return rejectWithValue('error initAuthData');
    }
  },
);
