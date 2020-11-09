import React from "react";
import i18n from "locales/i18n";
import "./LanguageSelection.scss";

const LANGUAGES = ["fr", "en"];

const LangOptions = () =>
  LANGUAGES.map((lang, idx) => (
    <option value={lang} key={idx}>
      {lang}
    </option>
  ));

export default function LanguageSelection() {
  const changeLanguage = (evt) => {
    const lang = evt.target.value;
    i18n.changeLanguage(lang);
  };

  return (
    <select className="lang-select" onChange={changeLanguage}>
      <LangOptions />
    </select>
  );
}
