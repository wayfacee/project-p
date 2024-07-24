import { FC, lazy } from "react";
import { LoginFormProps } from "./LoginForm";

// теряются просы:
export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => new Promise(res => {
  setTimeout(() => res(import('./LoginForm')), 1500);
}));