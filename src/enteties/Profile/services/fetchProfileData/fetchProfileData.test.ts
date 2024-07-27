import { Country } from "enteties/Country";
import { fetchProfileData } from "./fetchProfileData";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Currency } from "enteties/Currency";


describe('fetchProfileData', () => {
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
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: data }));
    // вызываем
    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
