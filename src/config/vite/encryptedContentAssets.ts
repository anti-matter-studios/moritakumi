/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { readdir } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";

const imageRoot = "public/images";
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".svg", ".webp"]);

/** Finds public image assets that must be emitted as encrypted blobs. */
export async function loadEncryptedImageInputs(root: string) {
    const files = await listFiles(resolve(root, imageRoot));

    return files
        .filter((filePath) => imageExtensions.has(extname(filePath).toLowerCase()))
        .map((absolutePath) => {
            const relativePath = toPublicPath(relative(resolve(root, "public"), absolutePath));

            return {
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

export interface EncryptedImageInput {
    filePath: string;
    relativePath: string;
    publicPath: string;
    mimeType: string;
}
