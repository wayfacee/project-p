import 'app/styles/index.scss';
import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
// чтобы определять толькот конкрет. кусочки стейта:
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'enteties/Profile';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// ЭТО ВСЕ ДЕЛАЕТСЯ ДЛ СТОРИСОВ, ПОЭТОМУ МОЖНО ЗАБИТЬ
// ДАЖЕ НА АБСОЛЮТ ИМПОРТЫ

// DeepPartial<ReducersMapObject<StateSchema>> мб прилетит андефайнд
// поэтому юх кастом. тип
const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducer?: ReducersList,
): Decorator => (StoryComponent) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducer }}>
    <StoryComponent />
  </StoreProvider>
);