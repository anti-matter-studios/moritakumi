/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { readFile, stat } from "node:fs/promises";
import { createServer, type Server } from "node:http";
import { extname, resolve } from "node:path";

const mimeTypes = new Map([
    [".css", "text/css; charset=utf-8"],
    [".html", "text/html; charset=utf-8"],
    [".js", "text/javascript; charset=utf-8"],
    [".jpg", "image/jpeg"],
    [".jpeg", "image/jpeg"],
    [".json", "application/json; charset=utf-8"],
    [".map", "application/json; charset=utf-8"],
    [".png", "image/png"],
    [".svg", "image/svg+xml"],
    [".webp", "image/webp"],
]);

/** Verifies that Vite has produced the static output consumed by PDF builds. */
export async function assertDistExists(distDir: string) {
    const stats = await stat(distDir);

    if (!stats.isDirectory()) {
        throw new Error(`${distDir} is not a directory.`);
    }
}

/** Serves a built `dist` directory to Playwright without starting Vite. */
export function createStaticServer(baseDir: string) {
    return createServer(async (request, response) => {
        try {
            const requestUrl = new URL(request.url ?? "/", "http://localhost");
            const relativePath = getRelativePath(requestUrl.pathname);
            const filePath = resolve(baseDir, relativePath);

            if (!filePath.startsWith(baseDir)) {
                response.writeHead(403);
                response.end("Forbidden");
                return;
            }

            const contents = await readFile(filePath);
            response.writeHead(200, {
                "content-type": mimeTypes.get(extname(filePath)) ?? "application/octet-stream",
            });
            response.end(contents);
        } catch {
            response.writeHead(404);
            response.end("Not found");
        }
    });
}

export async function listen(server: Server) {
    for (let port = 10_202; port < 10_302; port += 1) {
        if (await tryListen(server, port)) {
            return port;
        }
    }

    throw new Error("Unable to start the PDF static server on ports 10202-10301.");
}

function tryListen(server: Server, port: number) {
    return new Promise<boolean>((resolveListen, rejectListen) => {
        const handleError = (error: NodeJS.ErrnoException) => {
            server.off("listening", handleListening);

            if (error.code === "EADDRINUSE") {
                resolveListen(false);
                return;
            }

            rejectListen(error);
        };
        const handleListening = () => {
            server.off("error", handleError);
            resolveListen(true);
        };

        server.once("error", handleError);
        server.once("listening", handleListening);
        server.listen(port, "127.0.0.1");
    });
}

export function close(server: Server) {
    return new Promise<void>((resolveClose, rejectClose) => {
        server.close((error) => {
            if (error) {
                rejectClose(error);
                return;
            }

            resolveClose();
        });
    });
}

function getRelativePath(pathname: string) {
    const requestedPath = decodeURIComponent(pathname);
    return requestedPath === "/" ? "index.html" : requestedPath.slice(1);
}
