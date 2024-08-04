import { FC, lazy } from "react";
import { LoginFormProps } from "./LoginForm";

// теряются просы:
export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => import('./LoginForm'));