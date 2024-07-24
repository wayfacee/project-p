import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "enteties/Counter";
import { userReducer } from "enteties/User";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducer: ReducersMapObject<StateSchema> = ({
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  });

  const reducerManager = createReducerManager(rootReducer);

  const store = configureStore({
    // чтобы работали редюсеры
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];