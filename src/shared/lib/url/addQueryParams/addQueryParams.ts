// могли заюзать из реакт роутер дом, или подкл. еще что-то

// {
// search (название парам.): 'kotlin' (знач)
// }

// для тестов, чтоб не тестировать пушСтейт 35-string
export function getQueryParams(params: OptionalRecord<string, string>) {
  // надо передать строку, строка распарсится. и будет объект
  // как на 3-строке
  const searchParams = new URLSearchParams(window.location.search);
  // это будет объект с сущ. параметрами, которые есть
  // в строке запроса

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      // и добав. к сущ. парам.
      searchParams.set(name, value);
    }
  });

  // старые и новые параметры, добавляем в строку запросов
  // после ? можем добавлять query params
  return `?${searchParams.toString()}`;
}

/**
 * Функция добавления параметров строки запроса в URL,
 * но этот велосипед, работает только в одну сторону, надо
 * усовершенствовать, или просто useSearchParams
 * @param params
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
  // 3 арг. - то что в урл
  window.history.pushState(null, '', getQueryParams(params));
}

// все функции которые наход в шеред слое надо док.
