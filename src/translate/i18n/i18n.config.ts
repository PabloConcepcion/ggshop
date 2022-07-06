import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_es from "./es/common.json";
import common_en from "./en/common.json";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        ns: ['common'],
        defaultNS: 'common',
        resources: {
            'es': {
                common: common_es
            },
            'en': {
                common: common_en
            },
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