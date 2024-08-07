import { StateSchema } from "app/providers/StoreProvider";
import { getValidateErrors } from "./getValidateErrors";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

describe('getValidateErrors', () => {
  test('should work with filled state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INCORRECT_AGE,
          ValidateProfileError.SERVER_ERROR,
        ]
      }
    };

    expect(getValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.SERVER_ERROR,
    ]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});