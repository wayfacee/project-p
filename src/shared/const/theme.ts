// чтобы лежало все в одном местте типо theme
export enum Theme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme',
  VIOLET = 'app_violet_theme',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

// initAuthaData:
// отрис. новый pageloader, поэтому сохраняем
// фаллбэк на послед. выбранной темы 
// бэк - источник истины, а тут как запас. вариант
export const LOCAL_STORAGE_LAST_DESIGN_KEY = 'last_design';
// можно было в локалстореж
