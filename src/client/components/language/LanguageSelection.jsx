import React from "react";
import i18n from "locales/i18n";

const LANGUAGES = ["fr", "en"];

const renderLangOptions = () =>
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
    <select
      className="font-thin bg-white absolute top-0 right-0 z-50"
      onChange={changeLanguage}
    >
      {renderLangOptions()}
    </select>
  );
}
