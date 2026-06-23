/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";


/** Creates HTML route entries from the single source index file. */
export default function presentationRouteHtml(routes: string[]): Plugin {
    let config: ResolvedConfig;

    return {
        name: "presentation-route-html",
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        configureServer(server) {
            return () => {
                server.middlewares.use((request, _response, next) => {
                    const route = getRequestRoute(request.url);

                    if (routes.includes(route)) {
                        request.url = "/index.html";
                    }

                    next();
                });
            };
        },
        async closeBundle() {
            if (config.command !== "build") {
                return;
            }

            const outDir = resolve(config.root, config.build.outDir);
            const source = await readFile(resolve(outDir, "index.html"), "utf8");

            for (const route of routes) {
                if (route) {
                    await writeFile(resolve(outDir, `${route}.html`), source);
                }
            }
        },
    };
}

function getRequestRoute(url: string | undefined) {
    if (url === undefined) {
        return "";
    }

    const pathname = url
        .split("?")[0]
        .replace(/\/index\.html$/, "")
        .replace(/^\/|\/$/g, "");

    return pathname.replace(/\.html$/, "");
}
