import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entities/Article";
import { CounterSchema } from "entities/Counter";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { AddCommentFormSchema } from "features/addCommentForm";
import { LoginSchema } from "features/AuthByUsername";
import { ScrollSaveSchema } from "features/ScrollSave";
import { ArticleDetailsCommentsSchema } from "pages/ArticleDetailsPage";
import { ArticlesPageSchema } from "pages/ArticlesPage";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollSave: ScrollSaveSchema;

  // asnyc reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
};

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>; // DynamicModuleLoader

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;

  // true - вмонтирован, false - демонтирован
  // не все редюс. де/монтируем OptionalRecord
  getMountedReducers: () => MountedReducers;
}

// стандартный тип который возвращается при создании стора
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager,
}

// надо указ как не обяз. навигейт
export interface ThunkExtraArg {
  api: AxiosInstance;
  // navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}