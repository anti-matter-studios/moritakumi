/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

export interface ContentVaultManifest {
    version: 1;
    kdf: "PBKDF2";
    hash: "SHA-256";
    iterations: number;
    salt: string;
    translations: {
        iv: string;
        data: string;
    };
    images: Record<string, ContentVaultImage>;
}

export interface ContentVaultImage {
    path: string;
    iv: string;
    mimeType: string;
}
