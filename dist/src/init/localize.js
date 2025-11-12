'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
function default_1(app) {
    i18next
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init(
            {
                backend: {
                    loadPath: __dirname + '/locales/{{lng}}/translation.json',
                    addPath: __dirname + '/locales/ar/{{ns}}.json',
                },
                fallbackLng: 'en',
                preload: ['en', 'ar'],
                supportedLngs: ['en', 'ar'],
                cleanCode: true,
            },
            (err) => {
                if (err)
                    return console.log('something went wrong loading', err);
            }
        );
    app.use(i18nextMiddleware.handle(i18next, {}));
}
exports.default = default_1;
// How to use:
/* res.status(403).json({
  success: false,
  message: req.i18n.t('simpleStringWithVariable', {
    variable1: '3',
    variable2: '3',
  }),
}); */
//# sourceMappingURL=localize.js.map
