/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
    contentVaultFilesRoot,
    contentVaultManifestPath,
    plaintextLocales,
} from "./constants";
import type { ContentVaultManifest } from "./format";
import { readContentPassword } from "./password";
import { stringify } from "yaml";

const rootDir = resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const manifest = JSON.parse(
    await readFile(resolve(rootDir, contentVaultManifestPath), "utf8"),
) as ContentVaultManifest;
const key = await deriveKey(readContentPassword(), manifest);
const resources = JSON.parse(new TextDecoder().decode(await decryptBytes(
    manifest.translations.data,
    manifest.translations.iv,
    key,
))) as Record<string, { translation?: unknown } | undefined>;

for (const locale of plaintextLocales) {
    const resource = resources[locale.language]?.translation;

    if (resource === undefined) {
        throw new Error(`Missing ${locale.language} translations in content vault.`);
    }

    await mkdir(dirname(resolve(rootDir, locale.path)), { recursive: true });
    await writeTextFile(resolve(rootDir, locale.path), stringify(resource));
}

for (const [publicPath, image] of Object.entries(manifest.images)) {
    const encrypted = await readFile(resolve(rootDir, contentVaultFilesRoot, image.path));
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: fromBase64(image.iv) },
        key,
        encrypted,
    );

    await writeBinaryFile(resolve(rootDir, "public", publicPath.replace(/^\//, "")), new Uint8Array(decrypted));
}

console.log(`Opened ${plaintextLocales.length.toString()} locales and ${Object.keys(manifest.images).length.toString()} images.`);

async function deriveKey(password: string, vault: ContentVaultManifest) {
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"],
    );

    return crypto.subtle.deriveKey(
        {
            name: vault.kdf,
            hash: vault.hash,
            iterations: vault.iterations,
            salt: fromBase64(vault.salt),
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"],
    );
}

async function decryptBytes(data: string, iv: string, key: CryptoKey) {
    return crypto.subtle.decrypt(
        { name: "AES-GCM", iv: fromBase64(iv) },
        key,
        fromBase64(data),
    );
}

async function writeTextFile(filePath: string, value: string) {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, `${value}\n`);
}

async function writeBinaryFile(filePath: string, value: Uint8Array) {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, value);
}

function fromBase64(value: string) {
    return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}
