import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../model/types/profile";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const {
      extra,
      rejectWithValue,
      // для гетстейта типы переопрделяем в ThunkConfig (state)
      getState,
    } = thunkAPI;

    // селектор аргументом прирнимает стейт
    // в компонентах для получ. стейта юзаем useSelector
    // в asyncThunk => getState
    const formData = getProfileForm(getState());

    try {
      // обновление запросов
      const { data } = await extra.api.put<Profile>('/profile', formData);

      return data;
    } catch (e) {
    console.log(e);
      return rejectWithValue('error');
    }
  },
);
