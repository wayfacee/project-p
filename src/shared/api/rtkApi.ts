import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    // Функция для подготовки заголовков каждого запроса. В этом случае:
    prepareHeaders: (headers) => {
      // делает то же самое что и интерцептор
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
