import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/theme';

const initialState: UserSchema = {
  _inited: false,
};

const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      setFeatureFlags(payload.features);
      // Note: Consider moving side effects like localStorage operations outside of reducers

      // редюсеры должны быть чистыми, в данном месте не оч корректно
      // но чтоб не размазолось по проекту, оставили тут
      // в конкретно данном случае ниче не произайдет
      // поскоку реальных токенов для авто. нет, делаем такие заглушки
      // помимо юзерИД был бы токен, это либо JWT token или другая схема

      // по хорошему надо в асинк санке сохр.
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload.id));
      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        payload.features?.isAppRedesigned ? 'new' : 'old',
      );
    },
    // initAuthData: (state) => {
    //   const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    //   if (user) {
    //     const json = JSON.parse(user) as User;
    //     state.authData = json;
    //     setFeatureFlags(json.features);
    //   }
    //   state._inited = true;
    // },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      },
    );
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        setFeatureFlags(payload.features);
        state._inited = true;
      },
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
  },
});

export const { actions: userActions } = counterSlice;
export const { reducer: userReducer } = counterSlice;
