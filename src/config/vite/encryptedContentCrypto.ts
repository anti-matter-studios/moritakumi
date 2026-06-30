/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { webcrypto } from "node:crypto";

export const encryptedContentIterations = 310_000;

/** Derives the AES-GCM key used for every encrypted content payload. */
export async function deriveEncryptedContentKey(password: string, salt: Uint8Array<ArrayBuffer>) {
    const keyMaterial = await webcrypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"],
    );

    return webcrypto.subtle.deriveKey(
        { name: "PBKDF2", hash: "SHA-256", salt, iterations: encryptedContentIterations },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"],
    );
}

export type EncryptedContentKey = Awaited<ReturnType<typeof deriveEncryptedContentKey>>;

export async function encryptBytes(value: NodeJS.BufferSource, key: EncryptedContentKey): Promise<EncryptedBytes> {
    const iv = getRandomBytes(12);
    const encrypted = await webcrypto.subtle.encrypt({ name: "AES-GCM", iv }, key, value);

    return {
        iv,
        data: new Uint8Array(encrypted),
    };
}

export function getRandomBytes(length: number): Uint8Array<ArrayBuffer> {
    const bytes = new Uint8Array(length);
    webcrypto.getRandomValues(bytes);

    return bytes;
}

export function toBase64(value: Uint8Array) {
    return Buffer.from(value).toString("base64");
}

export interface EncryptedBytes {
    iv: Uint8Array<ArrayBuffer>;
    data: Uint8Array<ArrayBuffer>;
}
