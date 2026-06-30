/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { readdir } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";
import {
    plaintextImageExcludes,
    plaintextImageRoot,
} from "./constants";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".svg", ".webp"]);

/** Finds plaintext source images that should be sealed into the content vault. */
export async function loadPlaintextImageSources(root: string) {
    const imageRoot = resolve(root, plaintextImageRoot);
    const excludedRoots = plaintextImageExcludes.map((exclude) => resolve(root, exclude));
    const files = await listFiles(imageRoot);

    return files
        .filter((filePath) => imageExtensions.has(extname(filePath).toLowerCase()))
        .filter((filePath) => excludedRoots.every((exclude) => !filePath.startsWith(`${exclude}${sep}`)))
        .map((absolutePath) => {
            const relativePath = toPublicPath(relative(resolve(root, "public"), absolutePath));

            return {
                absolutePath,
                filePath: join("public", relativePath),
                relativePath,
                publicPath: `/${relativePath}`,
                mimeType: getMimeType(absolutePath),
            };
        });
}

async function listFiles(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
        const entryPath = join(directory, entry.name);

        if (entry.isDirectory()) {
            return listFiles(entryPath);
        }

        return entry.isFile() ? [entryPath] : [];
    }));

    return files.flat();
}

function getMimeType(filePath: string) {
    switch (extname(filePath).toLowerCase()) {
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".svg":
            return "image/svg+xml";
        case ".webp":
            return "image/webp";
        default:
            return "application/octet-stream";
    }
}

function toPublicPath(value: string) {
    return value.split(sep).join("/");
}
