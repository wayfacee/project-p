export interface User {
  id: string;
  username: string;
}

export interface UserSchema {
  authData?: User;
  // _ - нельзя менять
  _inited: boolean;
}