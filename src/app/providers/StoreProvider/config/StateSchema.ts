import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { CounterSchema } from "enteties/Counter";
import { ProfileSchema } from "enteties/Profile";
import { UserSchema } from "enteties/User";
import { LoginSchema } from "features/AuthByUsername";
import { NavigateOptions, To } from "react-router-dom";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // asnyc reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
};

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

// стандартный тип который возвращается при создании стора
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager,
}

// надо указ как не обяз. навигейт
export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}