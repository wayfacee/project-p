import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';
// есть более правильный вариант __API__

// instace axios
export const $api = axios.create({
  baseURL: __API__,
  headers: {
    // проверяется наличие заголовка, имитация авторизации
    Authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
  },
})