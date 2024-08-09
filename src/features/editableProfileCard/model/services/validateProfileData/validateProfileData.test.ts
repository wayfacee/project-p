import { Currency } from "@/entities/Currency";
import { validateProfileData } from "./validateProfileData";
import { Country } from "@/entities/Country";
import { ValidateProfileError } from "../../consts/consts";

describe('validateProfileData', () => {
  const data = {
    username: 'admin',
    age: 22,
    country: Country.Kyrgyzstan,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asd',
    currency: Currency.RUB,
  };

  test('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without first and last name', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' });
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });

  test('incorrect currency', async () => {
    const result = validateProfileData({ ...data, currency: undefined });
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_CURRENCY,
    ]);
  });

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test('incorrect all', async () => {
    const result = validateProfileData({});
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_CURRENCY,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
