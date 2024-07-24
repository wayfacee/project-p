import { Country, Currency } from "shared/const/common";

export interface Profile {
  first: string
  lastname: string;
  age: number;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
};

export interface ProfileSchema {
  data?: Profile;
  isLoading: boolean;
  error?: string;
  // режим для чтения / редактирования
  readonly: boolean;
}