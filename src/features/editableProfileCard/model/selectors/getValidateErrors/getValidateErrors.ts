import { StateSchema } from '@/app/providers/StoreProvider';

export const getValidateErrors = (state: StateSchema) =>
  state.profile?.validateErrors;
