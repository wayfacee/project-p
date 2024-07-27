import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../model/types/profile";
import { ThunkConfig } from "app/providers/StoreProvider";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, thunkAPI) => {
    const {
      extra,
      rejectWithValue
    } = thunkAPI;

    try {
      const { data } = await extra.api.get<Profile>('/profile');

      if (!data) throw new Error('problem with fethcProfileData')

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
