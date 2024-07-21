import { StateSchema } from "app/providers/StoreProvider";

export const getLoginState = (state: StateSchema) => state.loginForm;

// все селекторы стоит разбивать до мелчайщих полей
// но форма у нас маленькая из этого