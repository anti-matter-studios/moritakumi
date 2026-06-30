/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { PluginContext } from "rollup";
import {
    contentVaultFilesRoot,
    contentVaultManifestPath,
} from "../contentVault/constants";
import type { ContentVaultManifest } from "../contentVault/format";

/** Loads committed encrypted-at-rest content for Vite production output. */
export async function loadContentVault(root: string, emitFile: PluginContext["emitFile"]) {
    if (!await contentVaultExists(root)) {
        return undefined;
    }

    const manifestPath = resolve(root, contentVaultManifestPath);
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as ContentVaultManifest;
    const images = await Promise.all(Object.entries(manifest.images).map(async ([publicPath, image]) => {
        const source = await readFile(resolve(root, contentVaultFilesRoot, image.path));
        const referenceId = emitFile({
            type: "asset",
            fileName: `assets/encrypted-images/${image.path}`,
            source,
        });

        return {
            publicPath,
            iv: image.iv,
            mimeType: image.mimeType,
            referenceId,
        };
    }));

    return {
        hash: manifest.hash,
        iterations: manifest.iterations,
        kdf: manifest.kdf,
        salt: manifest.salt,
        translations: manifest.translations,
        images,
        watchFiles: [
            manifestPath,
            ...Object.values(manifest.images).map((image) => (
                resolve(root, contentVaultFilesRoot, image.path)
            )),
        ],
    };
}

export async function contentVaultExists(root: string) {
    try {
        await access(resolve(root, contentVaultManifestPath));
        return true;
    } catch {
        return false;
    }
}
