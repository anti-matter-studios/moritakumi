/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import yaml from "@modyfi/vite-plugin-yaml";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

import presentationRoutes from "./presentationRoutes";
import encryptedContent from "./vite/encryptedContent";
import openStreetMapExports from "./vite/openStreetMapExports";
import presentationRouteHtml from "./vite/presentationRouteHtml";

const isMapExportOnly = process.env.MORITAKUMI_MAP_EXPORT_ONLY === "1";

/** Vite configuration shared by development, page build, and PDF generation. */
export default defineConfig({
    appType: "mpa",
    server: { port: 10201 },
    plugins: isMapExportOnly ? [
        openStreetMapExports(),
    ] : [
        react(),
        viteTsconfigPaths(),
        yaml(),
        encryptedContent(),
        openStreetMapExports(),
        presentationRouteHtml([...presentationRoutes]),
    ],
    build: isMapExportOnly ? {
        outDir: ".map-export-build",
        rollupOptions: {
            input: "src/config/vite/mapExportEntry.ts",
        },
    } : undefined,
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: ["src/styles"],
            },
        },
    },
});
