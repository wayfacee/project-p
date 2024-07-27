import { Country } from "enteties/Country";
import { ProfileSchema, ValidateProfileError } from "../types/profile";
import { profileActions, profileReducer } from "./profileSlice";
import { Currency } from "enteties/Currency";
import { updateProfileData } from "enteties/Profile/services/updataProfileData/updateProfileData";

// в продукшене вот такие тесты, лучше не над
// трата времени, обычно тест. где есть логика, циклы, условия итд.
describe('profileSlice', () => {
  const data = {
    username: 'admin',
    age: 22,
    country: Country.Kyrgyzstan,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asd',
    currency: Currency.RUB,
  };

  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };

    expect(profileReducer(
      state as ProfileSchema,
      profileActions.setReadonly(true)
    )).toEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };

    expect(profileReducer(
      state as ProfileSchema,
      profileActions.cancelEdit()
    )).toEqual({
      readonly: true,
      validateErrors: [],
      data,
      form: data
    });
  });

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };

    expect(profileReducer(
      state as ProfileSchema,
      profileActions.updateProfile({
        username: '12345'
      }),
    )).toEqual({
      form: { username: '12345' }
    });
  });

  // extra reducers:
  test('test update profile pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };

    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.pending(''),
    )).toEqual({
      form: {
        isLoading: true,
        validateErrors: undefined,
      }
    });
  });

  test('test update profile fullfiled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.fulfilled(data, ''),
    )).toEqual({
      form: {
        isLoading: false,
        validateErrors: undefined,
        reodonly: true,
        form: data,
        data
      }
    });
  });
});