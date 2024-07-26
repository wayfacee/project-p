import { Country } from "enteties/Country/model/types/country";
import { Currency } from "enteties/Currency/model/types/currency";

export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  SERVER_ERROR = 'SERVER_ERROR',
  NO_DATA = 'NO_DATA'
}

export interface Profile {
  first?: string
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
};

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