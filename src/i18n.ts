/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translations from "virtual:encrypted-translations";

type TranslationResources = Record<string, { translation: object }>;

type DecryptedTranslations = {
  resources: TranslationResources;
  exportedKey?: string;
};

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
    : (await decryptTranslations(password ?? "")).resources;

  return initializeI18n(resources);
}

export async function initializeTranslationsWithPassword(password: string) {
  if (initPromise !== undefined) {
    await initPromise;
    return undefined;
  }

  const decrypted = await decryptTranslations(password);

  await initializeI18n(decrypted.resources);

  return decrypted.exportedKey;
}

export async function initializeTranslationsWithStoredKey(exportedKey: string) {
  if (initPromise !== undefined) {
    return initPromise;
  }

  const resources = translations.type === "plain"
    ? translations.resources
    : await decryptTranslationsWithStoredKey(exportedKey);

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

async function decryptTranslations(password: string): Promise<DecryptedTranslations> {
  if (translations.type !== "encrypted") {
    return { resources: translations.resources };
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
    true,
    ["decrypt"],
  );
  const [decrypted, exportedKey] = await Promise.all([
    decryptWithKey(key),
    crypto.subtle.exportKey("raw", key),
  ]);
  const decoded = new TextDecoder().decode(decrypted);

  return {
    resources: JSON.parse(decoded) as TranslationResources,
    exportedKey: toBase64(new Uint8Array(exportedKey)),
  };
}

async function decryptTranslationsWithStoredKey(exportedKey: string) {
  if (translations.type !== "encrypted") {
    return translations.resources;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    fromBase64(exportedKey),
    "AES-GCM",
    false,
    ["decrypt"],
  );
  const decrypted = await decryptWithKey(key);
  const decoded = new TextDecoder().decode(decrypted);

  return JSON.parse(decoded) as TranslationResources;
}

function decryptWithKey(key: CryptoKey) {
  if (translations.type !== "encrypted") {
    throw new Error("Translations are not encrypted.");
  }

  return crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(translations.iv) },
    key,
    fromBase64(translations.data),
  );
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function toBase64(value: Uint8Array) {
  let binary = "";

  value.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export default i18n;
