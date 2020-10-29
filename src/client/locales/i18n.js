import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import frlangJSON from "./fr-FR.json";
import enlangJSON from "./en-US.json";

console.log(enlangJSON);

const LANGUAGES = {
  en: { translation: enlangJSON },
  fr: { translation: frlangJSON },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: LANGUAGES,
    lng: "fr",
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
