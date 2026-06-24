/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

declare module "virtual:encrypted-translations" {
    type TranslationResources = Record<string, { translation: object }>;

    type PlainTranslations = {
        type: "plain";
        resources: TranslationResources;
    };

    type EncryptedTranslations = {
        type: "encrypted";
        kdf: "PBKDF2";
        hash: "SHA-256";
        iterations: number;
        salt: string;
        iv: string;
        data: string;
    };

    const translations: PlainTranslations | EncryptedTranslations;

    export default translations;
}
