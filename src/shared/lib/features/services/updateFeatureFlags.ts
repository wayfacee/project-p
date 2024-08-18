import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
  // надо правильно указывать features/saveJsonSettings
>('features/saveJsonSettings', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  const allFeatures = {
    ...getAllFeatureFlags(),
    ...newFeatures,
  };

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: allFeatures,
      }),
    );

    // поскоку фичи не реактивные (не сохр. в контексте / стейт)
    // интерфейс при измен. фичи, не перерис.
    // по скоку обыч. константа
    // это норм практика, пошта в большинств. проектов фича флаги
    // в рамках 1 - сессии не меняются

    // но лучше надо было оставить:
    window.location.reload();

    // обноваляем перем.
    // app тоже перерендер., поэтому условие inited
    // setFeatureFlags(allFeatures);
    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
