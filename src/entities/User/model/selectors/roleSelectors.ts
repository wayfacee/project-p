import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { UserRole } from "../types/user";

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// является ля юзер админом, и надо пробегаться по массиву
// кд раз
export const isUserAdmin = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes(UserRole.ADMIN))
);

export const isUserManager = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes(UserRole.MANAGER))
);