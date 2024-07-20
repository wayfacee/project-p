import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend) // or any other backend implementation
  .use(LanguageDetector) // or any other implementation
  .use(initReactI18next) // or any other implementation
  .init({
    fallbackLng: 'ru', // язык по умолч.
    debug: __IS_DEV__,

    interpolation: {
      escapeValue: false // React already escapes
    },

    backend: {
      // путь до загрузки переводов
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18next;