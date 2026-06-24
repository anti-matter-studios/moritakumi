/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translations from "virtual:encrypted-translations";

type TranslationResources = Record<string, { translation: object }>;

let initPromise: Promise<void> | undefined;

export function translationsAreEncrypted() {
  return translations.type === "encrypted";
}

export async function initializeTranslations(password?: string) {
  if (initPromise !== undefined) {
    return initPromise;
  }

  const resources = translations.type === "plain"
    ? translations.resources
    : await decryptTranslations(password ?? "");

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

async function decryptTranslations(password: string): Promise<TranslationResources> {
  if (translations.type !== "encrypted") {
    return translations.resources;
  }

  if (password.length === 0) {
    throw new Error("Password is required.");
  }

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: translations.kdf,
      hash: translations.hash,
      salt: fromBase64(translations.salt),
      iterations: translations.iterations,
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(translations.iv) },
    key,
    fromBase64(translations.data),
  );
  const decoded = new TextDecoder().decode(decrypted);

  return JSON.parse(decoded) as TranslationResources;
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

export default i18n;
