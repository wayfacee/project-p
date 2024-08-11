import { createReduxStore, AppDispatch } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import type { StateSchema, StateSchemaKey, ReduxStoreWithManager, ThunkConfig } from "./config/StateSchema";
// типы иногда могут исп. из выше стоящего слоя, но это
// скорее исклю.

export {
  StoreProvider,
  createReduxStore,
}

export type {
  StateSchema,
  AppDispatch,
  ThunkConfig,
  ReduxStoreWithManager,
  StateSchemaKey,
}