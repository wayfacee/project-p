import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { CounterSchema } from "enteties/Counter";
import { ProfileSchema } from "enteties/Profile";
import { UserSchema } from "enteties/User";
import { LoginSchema } from "features/AuthByUsername";

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