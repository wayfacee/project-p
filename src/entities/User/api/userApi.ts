import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';

interface SetJsonSettingsArg {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH', // не всего юзера, а лишь 1 поле
        body: {
          jsonSettings,
        },
      }),
    }),
  }),
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;