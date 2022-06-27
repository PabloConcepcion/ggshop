import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_es from "./es/common.json";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        ns: ['common'],
        defaultNS: 'common',
        resources: {
            'es': {
                common: common_es
            }
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage', 'cookie']
        }
    });


export default i18n;