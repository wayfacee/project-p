import { Country } from "enteties/Country/model/types/country";
import { Currency } from "enteties/Currency/model/types/currency";

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
}