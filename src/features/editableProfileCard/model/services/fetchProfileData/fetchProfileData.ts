import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const { data } = await extra.api.get<Profile>(`/profile/${profileId}`);

    if (!data) throw new Error('problem with fethcProfileData');

    return data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
