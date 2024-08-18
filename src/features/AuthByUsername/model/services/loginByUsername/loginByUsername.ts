import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

// EXTRAREDUCERS IS FOR ASYNC THUNK

// 1) то что возв., 2) аргумент, 3) конфиг санкАпи
export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    // указана как бэйсурл при создании аксиос (/login)
    const response = await extra.api.post<User>('/login', authData);

    if (!response.data) {
      throw new Error();
    }

    dispatch(userActions.setAuthData(response.data));
    // extra.navigate?.('/about');

    return response.data;
  } catch (e) {
    console.log(e);
    // нельяз юз useTranslation
    return rejectWithValue('error');
  }
});
