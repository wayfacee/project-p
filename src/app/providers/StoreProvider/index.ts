import { createReduxStore, AppDispatch } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import type { StateSchema, ReduxStoreWithManager, ThunkConfig } from "./config/StateSchema";
// типы иногда могут исп. из выше стоящего слоя, но это
// скорее исклю.

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  ReduxStoreWithManager,
  AppDispatch,
  ThunkConfig,
}