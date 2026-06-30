/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import yaml from "@modyfi/vite-plugin-yaml";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

import presentationRoutes from "./presentationRoutes";
import encryptedTranslations from "./vite/encryptedTranslations";
import presentationRouteHtml from "./vite/presentationRouteHtml";

/** Vite configuration shared by development, page build, and PDF generation. */
export default defineConfig({
    appType: "mpa",
    server: { port: 10201 },
    define: {
        CONTENT_PASSWORD: JSON.stringify(process.env.MORITAKUMI_CONTENT_PASSWORD),
    },
    plugins: [
        react(),
        viteTsconfigPaths(),
        yaml(),
        encryptedTranslations(),
        presentationRouteHtml([...presentationRoutes]),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: ["src/styles"],
            },
        },
    },
});
