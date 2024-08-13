import { StateSchema } from '@/app/providers/StoreProvider';

// из undefined пфтаемся достать поля, надо возв
// дефолт стейт, или отдельный сеелектор, лоадинг еррор юзер пасс итд.
export const getLoginState = (state: StateSchema) => state?.loginForm;

// все селекторы стоит разбивать до мелчайщих полей
// но форма у нас маленькая из этого
