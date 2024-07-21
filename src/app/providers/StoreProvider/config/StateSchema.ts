import { CounterSchema } from "enteties/Counter";
import { UserSchema } from "enteties/User";

export interface StateSchema {
  counter: CounterSchema;
  user?: UserSchema;
}