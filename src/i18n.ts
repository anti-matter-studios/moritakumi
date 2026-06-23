/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.yaml';
import frTranslation from './locales/fr/translation.yaml';

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation as object, },
      fr: { translation: frTranslation as object, },
    },
    fallbackLng: 'fr',
    interpolation: { escapeValue: false, },
  });

export default i18n;
