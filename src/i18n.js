import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "navigator",
        "htmlTag",
        "localStorage",
        "querystring",
        "sessionStorage",
        "path",
        "subdomain",
      ],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "/langs/{{lng}}.json",
    },
  });

export default i18n;
