import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';
// есть более правильный вариант __API__

// instace axios
export const $api = axios.create({
  baseURL: __API__,
  // headers: {
  // проверяется наличие заголовка, имитация авторизации
  // Authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
  // },
});

// ошибка (в начале), что не юзер не авториз. 
// все дело из за хедера достаем в момент созд. инстанса
// когда авториз. инстанс уже был создан, но в Authorization
// оставалась пустая строка
// и по хорошему надо добавь интерцептор

// интерцептор - паттерн, перехватчик, отраб.
// перед каким-то действием (в данно случ. - перед запросом)
// перед тем как отпр. любой запрос, будет отраб этот интрецеп.
// можно убрать хедер в $апи
$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  }

  return config;
})