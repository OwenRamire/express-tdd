const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    },
    detection: {
      lookupHeader: 'accept-language'
    }
  });

module.exports = i18next;