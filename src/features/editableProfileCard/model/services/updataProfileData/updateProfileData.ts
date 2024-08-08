import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { ValidateProfileError } from "../../consts/consts";
import { Profile } from "entities/Profile";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>(
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

    // ThunkConfig<ValidateProfileError[]
    const errors = validateProfileData(formData);

    if (errors.length) {
      return rejectWithValue(errors)
    }

    try {
      // обновление запросов
      // можно передевать пропсом, или доставать через стейт
      const { data } = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);

      if (!data) throw new Error('problem in updateDataProfile')

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  },
);
