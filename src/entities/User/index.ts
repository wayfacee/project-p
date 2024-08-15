import { getUserAuthData } from './model/selectors/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited';
import {
  getUserRoles,
  isUserAdmin,
  isUserManager,
} from './model/selectors/roleSelectors';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema } from './model/types/user';
import { UserRole } from './model/consts/consts';
export { saveJsonSettings } from './model/services/saveJsonSettings';
export { useJsonSettings } from './model/selectors/jsonSettings';

export {
  userReducer,
  userActions,
  getUserAuthData,
  getUserInited,
  isUserAdmin,
  isUserManager,
  getUserRoles,
  UserRole,
};

export type { User, UserSchema };