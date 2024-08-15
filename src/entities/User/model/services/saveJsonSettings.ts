import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;
  const userData = getUserAuthData(getState());
  const currentSettings = getJsonSettings(getState());

  if (!userData) throw new Error('saveJsonSettings userData');

  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings, // чтоб не перезаписались
          ...newJsonSettings,
        },
      }),
    ).unwrap(); // можем развернуть, и получить рил резалт. / промис

    if (!response.jsonSettings) {
      throw new Error('saveJsonSettings jsonSettings');
    }

    return response.jsonSettings;
  } catch (e) {
    return rejectWithValue('error saveJsonSettings');
  }
});
