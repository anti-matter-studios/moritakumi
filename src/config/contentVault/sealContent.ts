/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
    contentVaultFilesRoot,
    contentVaultManifestPath,
    plaintextLocales,
} from "./constants";
import { createContentVaultKey, encryptBytes, toBase64 } from "./crypto";
import type { ContentVaultManifest } from "./format";
import { readContentPassword } from "./password";
import { loadPlaintextImageSources } from "./plaintextSources";

const require = createRequire(import.meta.url);
const { load } = require("js-yaml") as { load(this: void, source: string): unknown };

const rootDir = resolve(fileURLToPath(new URL("../../..", import.meta.url)));

const password = readContentPassword();
const keyDetails = await createContentVaultKey(password);
const [resources, images] = await Promise.all([
    loadTranslationResources(),
    loadPlaintextImageSources(rootDir),
]);
const translations = await encryptBytes(
    new TextEncoder().encode(JSON.stringify(resources)),
    keyDetails.key,
);
const manifest: ContentVaultManifest = {
    version: 1,
    hash: keyDetails.hash,
    iterations: keyDetails.iterations,
    kdf: keyDetails.kdf,
    salt: keyDetails.salt,
    translations: {
        iv: toBase64(translations.iv),
        data: toBase64(translations.data),
    },
    images: {},
};

await rm(resolve(rootDir, contentVaultFilesRoot), { force: true, recursive: true });

for (const image of images) {
    const contents = await readFile(image.absolutePath);
    const encrypted = await encryptBytes(contents, keyDetails.key);
    const vaultPath = `${image.relativePath}.enc`;
    const outputPath = resolve(rootDir, contentVaultFilesRoot, vaultPath);

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, encrypted.data);

    manifest.images[image.publicPath] = {
        path: vaultPath,
        iv: toBase64(encrypted.iv),
        mimeType: image.mimeType,
    };
}

await writeJson(resolve(rootDir, contentVaultManifestPath), manifest);

console.log(`Sealed ${plaintextLocales.length.toString()} locales and ${images.length.toString()} images.`);
console.log("Plaintext source files were left untouched.");

async function loadTranslationResources() {
    const entries = await Promise.all(plaintextLocales.map(async (locale) => {
        const source = await readFile(resolve(rootDir, locale.path), "utf8");

        return [locale.language, { translation: load(source) }] as const;
    }));

    return Object.fromEntries(entries);
}

async function writeJson(filePath: string, value: unknown) {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
