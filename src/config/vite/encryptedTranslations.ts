/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { webcrypto } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

const require = createRequire(import.meta.url);
const { load } = require("js-yaml") as { load(this: void, source: string): unknown };

const virtualModuleId = "virtual:encrypted-translations";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;
const passwordEnvName = "MORITAKUMI_CONTENT_PASSWORD";
const iterations = 310_000;

const locales = [
    { language: "en", path: "src/locales/en/translation.yaml" },
    { language: "fr", path: "src/locales/fr/translation.yaml" },
];

/** Emits encrypted translation resources for production builds. */
export default function encryptedTranslations(): Plugin {
    let config: ResolvedConfig;

    return {
        name: "encrypted-translations",
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        resolveId(id) {
            return id === virtualModuleId ? resolvedVirtualModuleId : undefined;
        },
        async load(id) {
            if (id !== resolvedVirtualModuleId) {
                return undefined;
            }

            for (const locale of locales) {
                this.addWatchFile(resolve(config.root, locale.path));
            }

            const resources = await loadTranslationResources(config.root);

            if (config.command !== "build") {
                return `export default ${JSON.stringify({ type: "plain", resources })};`;
            }

            const password = process.env[passwordEnvName];

            if (password === undefined || password.length === 0) {
                throw new Error(`Set ${passwordEnvName} before building translations.`);
            }

            return `export default ${JSON.stringify({
                type: "encrypted",
                ...await encryptJson(resources, password),
            })};`;
        },
    };
}

async function loadTranslationResources(root: string) {
    const entries = await Promise.all(locales.map(async (locale) => {
        const source = await readFile(resolve(root, locale.path), "utf8");

        return [locale.language, { translation: load(source) }] as const;
    }));

    return Object.fromEntries(entries);
}

async function encryptJson(value: unknown, password: string) {
    const salt = getRandomBytes(16);
    const iv = getRandomBytes(12);
    const key = await deriveKey(password, salt);
    const encoded = new TextEncoder().encode(JSON.stringify(value));
    const encrypted = await webcrypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

    return {
        kdf: "PBKDF2",
        hash: "SHA-256",
        iterations,
        salt: Buffer.from(salt).toString("base64"),
        iv: Buffer.from(iv).toString("base64"),
        data: Buffer.from(encrypted).toString("base64"),
    };
}

async function deriveKey(password: string, salt: Uint8Array<ArrayBuffer>) {
    const keyMaterial = await webcrypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"],
    );

    return webcrypto.subtle.deriveKey(
        { name: "PBKDF2", hash: "SHA-256", salt, iterations },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"],
    );
}

function getRandomBytes(length: number): Uint8Array<ArrayBuffer> {
    const bytes = new Uint8Array(length);
    webcrypto.getRandomValues(bytes);

    return bytes;
}
