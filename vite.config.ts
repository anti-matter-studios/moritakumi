/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { readdirSync } from "node:fs";
import { parse, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

const htmlInputs = Object.fromEntries(
    readdirSync(rootDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
        .map((entry) => [
            parse(entry.name).name,
            resolve(rootDir, entry.name),
        ]),
);

export default defineConfig({
    build: {
        rollupOptions: {
            input: htmlInputs,
        },
    },
    server: { port: 10201 },
    plugins: [react({})],
});
