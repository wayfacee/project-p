import 'app/styles/index.scss';
import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
// чтобы определять толькот конкрет. кусочки стейта:
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'enteties/Profile';

// ЭТО ВСЕ ДЕЛАЕТСЯ ДЛ СТОРИСОВ, ПОЭТОМУ МОЖНО ЗАБИТЬ
// ДАЖЕ НА АБСОЛЮТ ИМПОРТЫ

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
  profile: profileReducer,
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducer?: DeepPartial<ReducersMapObject<StateSchema>>
): Decorator => (StoryComponent) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducer }}>
    <StoryComponent />
  </StoreProvider>
);