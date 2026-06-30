/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

export const contentPasswordEnvName = "MORITAKUMI_CONTENT_PASSWORD";
export const contentVaultManifestPath = "src/content-vault/manifest.json";
export const contentVaultFilesRoot = "src/content-vault/files";

export const plaintextLocales = [
    { language: "en", path: "src/locales/en/translation.yaml" },
    { language: "fr", path: "src/locales/fr/translation.yaml" },
] as const;

export const plaintextImageRoot = "public/images";
export const plaintextImageExcludes = ["public/images/maps/tiles"];
