import { Profile } from "entities/Profile/model/types/profile";
import { ValidateProfileError } from "../consts/consts";

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
