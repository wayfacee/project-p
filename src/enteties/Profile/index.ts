export { ProfileCard } from './ui/ProfileCard/ProfileCard';
export { fetchProfileData } from './services/fetchProfileData/fetchProfileData';
export { Profile, ProfileSchema, } from './model/types/profile';
// изодируем в рамках конкрет. стр.:
export { profileActions, profileReducer } from './model/slice/profileSlice';