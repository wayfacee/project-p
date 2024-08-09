import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileForm } from "./getProfileForm";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";

describe('getProfileForm', () => {
  test('should return formData', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Kyrgyzstan,
      lastname: 'ulbi tv',
      first: 'asd',
      city: 'asd',
      currency: Currency.RUB,
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data
      }
    };

    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});