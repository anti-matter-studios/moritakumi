/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import styles from "./LanguageToggle.module.scss";


/** Language selector rendered inside the navigation bar. */
export default function LanguageToggle() {
    const { i18n, t } = useTranslation();
    const language = getLanguage(i18n.resolvedLanguage ?? i18n.language);
    const nextLanguage = getNextLanguage(language);
    const currentOption = languageOptions[language];
    const nextOption = languageOptions[nextLanguage];

    function cycleLanguage() {
        void i18n.changeLanguage(nextLanguage);
    }

    return <button
        type="button"
        className={styles.toggle}
        aria-label={t("navbar.switchLanguage", { language: t(nextOption.labelKey) })}
        title={t("navbar.switchLanguage", { language: t(nextOption.labelKey) })}
        onClick={cycleLanguage}
    >
        <span aria-hidden="true">{currentOption.flag}</span>
    </button>;
}

type Language = keyof typeof languageOptions;

const languageOptions = {
    fr: {
        flag: "🇫🇷",
        labelKey: "navbar.french",
    },
    en: {
        flag: "🇬🇧",
        labelKey: "navbar.english",
    },
    // de: {
    //     flag: "🇩🇪",
    //     labelKey: "navbar.german",
    // },
} as const;

function getLanguage(language: string): Language {
    for (const supportedLanguage of Object.keys(languageOptions) as Language[]) {
        if (language.startsWith(supportedLanguage)) {
            return supportedLanguage;
        }
    }

    return "fr";
}

function getNextLanguage(language: Language): Language {
    const supportedLanguages = Object.keys(languageOptions) as Language[];
    const currentIndex = supportedLanguages.indexOf(language);
    const nextIndex = (currentIndex + 1) % supportedLanguages.length;
    return supportedLanguages[nextIndex];
}
