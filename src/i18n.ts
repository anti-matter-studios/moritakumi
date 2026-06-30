/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import {
  contentIsEncrypted,
  decryptContentWithPassword,
  decryptContentWithStoredKey,
  getPlainTranslationResources,
} from "@/content";

type TranslationResources = Record<string, { translation: object }>;

let initPromise: Promise<void> | undefined;

export function translationsAreEncrypted() {
  return contentIsEncrypted();
}

export async function initializeTranslations(password?: string) {
  if (initPromise !== undefined) {
    return initPromise;
  }

  const resources = contentIsEncrypted()
    ? (await decryptContentWithPassword(password ?? "")).resources
    : getPlainTranslationResources();

  return initializeI18n(resources);
}

export async function initializeTranslationsWithPassword(password: string) {
  if (initPromise !== undefined) {
    await initPromise;
    return undefined;
  }

  const decrypted = await decryptContentWithPassword(password);

  await initializeI18n(decrypted.resources);

  return decrypted.exportedKey;
}

export async function initializeTranslationsWithStoredKey(exportedKey: string) {
  if (initPromise !== undefined) {
    return initPromise;
  }

  const resources = contentIsEncrypted()
    ? await decryptContentWithStoredKey(exportedKey)
    : getPlainTranslationResources();

  return initializeI18n(resources);
}

function initializeI18n(resources: TranslationResources) {
  initPromise = i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'fr',
      interpolation: { escapeValue: false, },
    })
    .then(() => undefined);

  return initPromise;
}

export default i18n;
