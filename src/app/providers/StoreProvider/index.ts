import { createReduxStore } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import { StateSchema } from "./config/StateSchema";
// типы иногда могут исп. из выше стоящего слоя, но это
// скорее исклю.

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
}