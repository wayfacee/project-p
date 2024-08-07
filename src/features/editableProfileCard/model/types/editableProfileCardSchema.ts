import { Profile } from "entities/Profile/model/types/profile";

export interface ProfileSchema {
  data?: Profile;
  // то, что измен. юзер:
  form?: Profile;
  isLoading: boolean;
  error?: string;
  // режим для чтения / редактирования
  readonly: boolean;

  // ошибок мб нескока:
  validateErrors?: ValidateProfileError[];
}
export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  SERVER_ERROR = 'SERVER_ERROR',
  NO_DATA = 'NO_DATA'
}
