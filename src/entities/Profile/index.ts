export { ValidateProfileError } from './model/types/profile';

export { getValidateErrors } from './model/selectors/getValidateErrors/getValidateErrors';
export { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly';
export { getProfileData } from './model/selectors/getProfileData/getProfileData';
export { getProfileError } from './model/selectors/getProfileError/getProfileError';
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';

// работу со стейтом, лучше надо было бы делать на слое стр.
// не над было бы отдавать наружу
export { updateProfileData } from './services/updataProfileData/updateProfileData';
export { fetchProfileData } from './services/fetchProfileData/fetchProfileData';
export { Profile, ProfileSchema, } from './model/types/profile';
// изодируем в рамках конкрет. стр.:
export { profileActions, profileReducer } from './model/slice/profileSlice';