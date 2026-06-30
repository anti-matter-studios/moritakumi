/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    deriveEncryptedContentKey,
    encryptBytes,
    encryptedContentIterations,
    getRandomBytes,
    toBase64,
} from "../vite/encryptedContentCrypto";

/** Creates the shared content-vault key and serializable salt metadata. */
export async function createContentVaultKey(password: string) {
    const salt = getRandomBytes(16);
    const key = await deriveEncryptedContentKey(password, salt);

    return {
        hash: "SHA-256" as const,
        iterations: encryptedContentIterations,
        kdf: "PBKDF2" as const,
        key,
        salt: toBase64(salt),
    };
}

export { encryptBytes, toBase64 };
