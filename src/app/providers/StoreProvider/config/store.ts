import { combineReducers, configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "enteties/Counter";
import { userReducer } from "enteties/User";
import { loginReducer } from "features/AuthByUsername";

// ReducersMapObject
const rootReducer = combineReducers<ReducersMapObject<StateSchema>>({
  counter: counterReducer,
  user: userReducer,
  loginForm: loginReducer,
});

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];