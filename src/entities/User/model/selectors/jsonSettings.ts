import { buildSelector } from '@/shared/store';
import { JsonSettings } from '../types/jsonSettings';

// выносим за пределы селектора, чтоб конст не менялась
// иначе при кд вызове селектора, еслиб объявили внутри
// то создавался кд раз
const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.user.authData?.jsonSettings ?? defaultJsonSettings,
);

// возвращется union, тема / булеан / андеф., генериками
// надо поиграться или лучше этим хуком useJsonSettings
// export const [useJsonSettingByKey, getJsonSettingByKey] = buildSelector(
//   (state, key: keyof JsonSettings) => state.user.authData?.jsonSettings?.[key],
// );
