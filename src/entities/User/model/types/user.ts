export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
  rules?: UserRole[];
}

export interface UserSchema {
  authData?: User;
  // _ - нельзя менять
  _inited: boolean;
}