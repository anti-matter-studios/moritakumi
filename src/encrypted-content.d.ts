/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

declare module "virtual:encrypted-content" {
    type TranslationResources = Record<string, { translation: object }>;

    type PlainContent = {
        type: "plain";
        resources: TranslationResources;
    };

    type EncryptedContent = {
        type: "encrypted";
        kdf: "PBKDF2";
        hash: "SHA-256";
        iterations: number;
        salt: string;
        translations: {
            iv: string;
            data: string;
        };
        images: Record<string, {
            url: string;
            iv: string;
            mimeType: string;
        }>;
    };

    const content: PlainContent | EncryptedContent;

    export default content;
}
