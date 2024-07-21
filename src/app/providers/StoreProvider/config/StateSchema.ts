import { CounterSchema } from "enteties/Counter";
import { UserSchema } from "enteties/User";
import { LoginSchema } from "features/AuthByUsername";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  loginForm: LoginSchema
}