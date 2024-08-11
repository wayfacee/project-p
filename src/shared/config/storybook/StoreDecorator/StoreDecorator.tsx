import '@/app/styles/index.scss';
import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// чтобы определять толькот конкрет. кусочки стейта:
import { loginReducer } from '@/features/AuthByUsername';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '@/entities/Article';
import { addCommentFormReducer } from '@/features/addCommentForm';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage';
import { profileReducer } from '@/features/editableProfileCard';

// ЭТО ВСЕ ДЕЛАЕТСЯ ДЛ СТОРИСОВ, ПОЭТОМУ МОЖНО ЗАБИТЬ
// ДАЖЕ НА АБСОЛЮТ ИМПОРТЫ

// DeepPartial<ReducersMapObject<StateSchema>> мб прилетит андефайнд
// поэтому юх кастом. тип
const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducer?: ReducersList,
): Decorator => (StoryComponent) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducer }}>
    <StoryComponent />
  </StoreProvider>
);