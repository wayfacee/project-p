import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { counterReducer } from "enteties/Counter";
import { userReducer } from "enteties/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "shared/api/api";
import { NavigateOptions, To } from "react-router-dom";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducer: ReducersMapObject<StateSchema> = ({
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  });

  const reducerManager = createReducerManager(rootReducer);

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate
  }

  const store = configureStore({
    // чтобы работали редюсеры
    // неправильный был тип у редюсера (reducerManager.reduce as ReducersMapObject<StateSchema>)
    // просто привели через эс, мб в конце исправим
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    // подключаем инстанс к санку:
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      }
    })
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];