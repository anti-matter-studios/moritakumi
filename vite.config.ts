/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import yaml from "@modyfi/vite-plugin-yaml";
import presentationRouteHtml from "./config/presentationRouteHtml";
import encryptedTranslations from "./config/encryptedTranslations";

const presentationRoutes = ["", "who-am-i", "my-hobbies", "my-travels", "personality", "skills", "school", "career", "project", "thanks"];

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
        presentationRouteHtml(presentationRoutes),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: ["src/styles"]
            }
        }
    }
});
