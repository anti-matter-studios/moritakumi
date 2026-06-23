/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import yaml from "@modyfi/vite-plugin-yaml";
import presentationRouteHtml from "./config/presentationRouteHtml";

const presentationRoutes = ["", "who-am-i", "my-hobbies", "my-travels"];

export default defineConfig({
    appType: "mpa",
    server: { port: 10201 },
    plugins: [
        react(),
        viteTsconfigPaths(),
        yaml(),
        presentationRouteHtml(presentationRoutes),
    ],
});
