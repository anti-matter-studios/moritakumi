/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import content from "virtual:encrypted-content";

type TranslationResources = Record<string, { translation: object }>;

type DecryptedContent = {
    resources: TranslationResources;
    exportedKey?: string;
};

let contentKey: CryptoKey | undefined;
const imageSourceCache = new Map<string, Promise<string>>();

export function contentIsEncrypted() {
    return content.type === "encrypted";
}

export function getPlainTranslationResources() {
    if (content.type !== "plain") {
        throw new Error("Content is encrypted.");
    }

    return content.resources;
}

export async function decryptContentWithPassword(password: string): Promise<DecryptedContent> {
    if (content.type !== "encrypted") {
        return { resources: content.resources };
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
            name: content.kdf,
            hash: content.hash,
            salt: fromBase64(content.salt),
            iterations: content.iterations,
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["decrypt"],
    );
    const [resources, exportedKey] = await Promise.all([
        decryptTranslationResources(key),
        crypto.subtle.exportKey("raw", key),
    ]);

    contentKey = key;

    return {
        resources,
        exportedKey: toBase64(new Uint8Array(exportedKey)),
    };
}

export async function decryptContentWithStoredKey(exportedKey: string) {
    if (content.type !== "encrypted") {
        return content.resources;
    }

    const key = await crypto.subtle.importKey(
        "raw",
        fromBase64(exportedKey),
        "AES-GCM",
        false,
        ["decrypt"],
    );
    const resources = await decryptTranslationResources(key);

    contentKey = key;

    return resources;
}

export async function getContentImageSource(publicPath: string) {
    if (content.type === "plain") {
        return publicPath;
    }

    const image = content.images[publicPath];

    if (image === undefined) {
        throw new Error(`No encrypted image found for ${publicPath}.`);
    }

    const cachedSource = imageSourceCache.get(publicPath);

    if (cachedSource !== undefined) {
        return cachedSource;
    }

    const source = decryptImageSource(image);
    imageSourceCache.set(publicPath, source);

    return source;
}

async function decryptTranslationResources(key: CryptoKey) {
    if (content.type !== "encrypted") {
        return content.resources;
    }

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: fromBase64(content.translations.iv) },
        key,
        fromBase64(content.translations.data),
    );
    const decoded = new TextDecoder().decode(decrypted);

    return JSON.parse(decoded) as TranslationResources;
}

async function decryptImageSource(image: EncryptedImageMetadata) {
    if (contentKey === undefined) {
        throw new Error("Content key is not available.");
    }

    const response = await fetch(image.url);

    if (!response.ok) {
        throw new Error(`Failed to load encrypted image ${image.url}.`);
    }

    const encrypted = await response.arrayBuffer();
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: fromBase64(image.iv) },
        contentKey,
        encrypted,
    );
    const blob = new Blob([decrypted], { type: image.mimeType });

    return URL.createObjectURL(blob);
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

interface EncryptedImageMetadata {
    url: string;
    iv: string;
    mimeType: string;
}
