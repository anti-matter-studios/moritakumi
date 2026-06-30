/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { readFile, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import {
    deriveEncryptedContentKey,
    encryptBytes,
    encryptedContentIterations,
    getRandomBytes,
    toBase64,
} from "./encryptedContentCrypto";
import {
    type EncryptedImageInput,
    loadEncryptedImageInputs
} from "./encryptedContentAssets";
import { loadContentVault } from "./encryptedContentVault";

const require = createRequire(import.meta.url);
const { load } = require("js-yaml") as { load(this: void, source: string): unknown };

const virtualModuleId = "virtual:encrypted-content";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;
const passwordEnvName = "MORITAKUMI_CONTENT_PASSWORD";

const locales = [
    { language: "en", path: "src/locales/en/translation.yaml" },
    { language: "fr", path: "src/locales/fr/translation.yaml" },
];

/** Emits encrypted translation and image resources for production builds. */
export default function encryptedContent(): Plugin {
    let config: ResolvedConfig;

    return {
        name: "encrypted-content",
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

            const vault = await loadContentVault(config.root, this.emitFile.bind(this));

            if (vault !== undefined && config.command === "build") {
                for (const filePath of vault.watchFiles) {
                    this.addWatchFile(filePath);
                }

                return createEncryptedModuleCode(vault);
            }

            for (const locale of locales) {
                this.addWatchFile(resolve(config.root, locale.path));
            }

            const [resources, images] = await Promise.all([
                loadTranslationResources(config.root),
                loadEncryptedImageInputs(config.root),
            ]);

            for (const image of images) {
                this.addWatchFile(resolve(config.root, image.filePath));
            }

            if (config.command !== "build") {
                return `export default ${JSON.stringify({
                    type: "plain",
                    resources,
                })};`;
            }

            const password = process.env[passwordEnvName];

            if (password === undefined || password.length === 0) {
                throw new Error(`Set ${passwordEnvName} before building encrypted content.`);
            }

            const salt = getRandomBytes(16);
            const key = await deriveEncryptedContentKey(password, salt);
            const translations = await encryptBytes(
                new TextEncoder().encode(JSON.stringify(resources)),
                key,
            );
            const encryptedImages = await Promise.all(images.map(async (image) => {
                const contents = await readFile(resolve(config.root, image.filePath));
                const encrypted = await encryptBytes(contents, key);
                const referenceId = this.emitFile({
                    type: "asset",
                    fileName: `assets/encrypted-images/${image.relativePath}.enc`,
                    source: encrypted.data,
                });

                return {
                    ...image,
                    ...encrypted,
                    referenceId,
                };
            }));

            return createEncryptedModuleCode({
                hash: "SHA-256",
                iterations: encryptedContentIterations,
                kdf: "PBKDF2",
                salt,
                translations,
                images: encryptedImages,
            });
        },
        async closeBundle() {
            if (config.command !== "build") {
                return;
            }

            await rm(resolve(config.root, config.build.outDir, "images"), {
                force: true,
                recursive: true,
            });
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

function createEncryptedModuleCode(content: EncryptedContentBuild) {
    const images = content.images.map((image) => [
        JSON.stringify(image.publicPath),
        [
            "{",
            `url: import.meta.ROLLUP_FILE_URL_${image.referenceId},`,
            `iv: ${JSON.stringify(serializeEncryptedValue(image.iv))},`,
            `mimeType: ${JSON.stringify(image.mimeType)}`,
            "}",
        ].join(""),
    ]);

    return [
        "export default {",
        'type: "encrypted",',
        `kdf: ${JSON.stringify(content.kdf)},`,
        `hash: ${JSON.stringify(content.hash)},`,
        `iterations: ${content.iterations.toString()},`,
        `salt: ${JSON.stringify(serializeEncryptedValue(content.salt))},`,
        "translations: {",
        `iv: ${JSON.stringify(serializeEncryptedValue(content.translations.iv))},`,
        `data: ${JSON.stringify(serializeEncryptedValue(content.translations.data))}`,
        "},",
        "images: {",
        images.map(([path, metadata]) => `${path}: ${metadata}`).join(","),
        "}",
        "};",
    ].join("");
}

function serializeEncryptedValue(value: string | Uint8Array) {
    return typeof value === "string" ? value : toBase64(value);
}

interface EncryptedContentBuild {
    hash: "SHA-256";
    iterations: number;
    kdf: "PBKDF2";
    salt: string | Uint8Array<ArrayBuffer>;
    translations: SerializableEncryptedBytes;
    images: Array<EncryptedImageBuild>;
}

interface SerializableEncryptedBytes {
    iv: string | Uint8Array<ArrayBuffer>;
    data: string | Uint8Array<ArrayBuffer>;
}

interface EncryptedImageBuild extends Partial<EncryptedImageInput> {
    publicPath: string;
    iv: string | Uint8Array<ArrayBuffer>;
    mimeType: string;
    referenceId: string;
}
