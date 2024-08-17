import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/theme';
import { FeatureFlags } from '@/shared/types/featureFlags';

// будем сохр в конст, не реактивные
// думал что фича флаги, в рамках 1 сессии не могут меняться
// то есть мы сохраняем откуда-то конст., и к этой конст
// имеем доступ во всем прилож., тип в контекст / стейт не сохранял
// это говорит о том что, если фича флаги помен., интерфейс
// не будет перерис, пошта реакт не подписан на измен
// вот этой конст., но в рамках 1 сессии, фичи не меняются
// но все равно редизайн будем делать, и все таки реактивность
// понадоб., и можно перейти на редаксовский стейт, и сохр
// фича флаги туда, но пока универсальным способом польз.

// снаружи не имеем доступа (нет эксп.), чтобы не измен. ее случ.
// если хотим прочитать флажок то исп. спец гетер getFeatureFlag
const defaultFeatures: FeatureFlags = {
  // если есть какая-то тема, то проиниц:
  // чтоб не мешало
  isAppRedesigned:
  localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗ. ДЕЛАТЬ РЕАКТИНЫМИ?
// mb undefined:
let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  } else {
    console.warn('Feature flags not set');
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  if (featureFlags === undefined) {
    // Handle the case where featureFlags is not initialized
    throw new Error('Feature flags have not been initialized');
  }

  // mb undefined: (?.)
  return featureFlags[flag];
}

export function getAllFeatureFlags() {
  if (featureFlags === undefined) {
    throw new Error('Feature flags have not been initialized');
  }

  return featureFlags;
}
