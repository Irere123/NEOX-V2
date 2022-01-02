import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";
import { SolidDone } from "../../../icons";

const languages = [
  { value: "en", flag: "🇬🇧", label: "English" }, // English,
  { value: "en-US", flag: "🇬🇧", label: "English US" }, // English,
  { value: "fr", flag: "🇫🇷", label: "Français" }, // French
  { value: "kiny", flag: "🇫🇷", label: "Kinyarwanda" }, // kinyirwanda
  { value: "kisw", flag: "🇫🇷", label: "Kiswahili" }, // kiswahili
];

export const Language: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const { t } = useTypeSafeTranslation();

  return (
    <div style={{ padding: "0px 20px 0px 20px" }}>
      <p style={{ fontSize: "20px", textTransform: "uppercase" }}>
        {t("pages.settings.language")}
      </p>
      <div className="languageTab__layout">
        {languages.map((l, idx) => (
          <div
            onClick={() => {
              i18n.changeLanguage(l.value);
              setLang(l.value);
            }}
            key={idx}
            className={`languageTab__langCard ${
              lang === l.value ? "activeLang" : ""
            }`}
          >
            {lang === l.value && (
              <span>
                <SolidDone />
              </span>
            )}
            <div>
              <p>{l.label}</p>
            </div>
            <span>{l.flag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
