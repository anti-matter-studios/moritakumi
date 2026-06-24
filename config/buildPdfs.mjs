/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { createServer } from "node:http";
import { access, mkdir, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDir = resolve(rootDir, "dist");
const pdfDir = resolve(distDir, "pdfs");

const pages = [
    { route: "who-am-i", fileName: "who-am-i.pdf" },
    { route: "my-hobbies", fileName: "my-hobbies.pdf" },
    { route: "my-travels", fileName: "my-travels.pdf" }
];

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
    [".webp", "image/webp"]
]);

await assertDistExists();
await mkdir(pdfDir, { recursive: true });

const server = createStaticServer(distDir);
await listen(server);

const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;
let browser;

try {
    browser = await launchBrowser();

    const context = await browser.newContext({
        locale: "fr-FR",
        viewport: { width: 1920, height: 1080 }
    });

    for (const pageConfig of pages) {
        const page = await context.newPage();
        const url = `${origin}/${pageConfig.route}.html`;
        const outputPath = join(pdfDir, pageConfig.fileName);

        await page.goto(url, { waitUntil: "networkidle" });
        await page.emulateMedia({ media: "print" });
        await page.pdf({
            path: outputPath,
            landscape: true,
            preferCSSPageSize: true,
            printBackground: true,
        });
        await page.close();

        console.log(`Created ${outputPath}`);
    }
} finally {
    await browser?.close();
    await close(server);
}

async function assertDistExists() {
    try {
        const stats = await stat(distDir);

        if (!stats.isDirectory()) {
            throw new Error(`${distDir} is not a directory.`);
        }
    } catch (error) {
        throw new Error("Run `bun run build` before generating PDFs.", { cause: error });
    }
}

function createStaticServer(baseDir) {
    return createServer(async (request, response) => {
        try {
            const requestUrl = new URL(request.url ?? "/", "http://localhost");
            const requestedPath = decodeURIComponent(requestUrl.pathname);
            const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
            const filePath = resolve(baseDir, relativePath);

            if (!filePath.startsWith(baseDir)) {
                response.writeHead(403);
                response.end("Forbidden");
                return;
            }

            const contents = await readFile(filePath);
            response.writeHead(200, {
                "content-type": mimeTypes.get(extname(filePath)) ?? "application/octet-stream"
            });
            response.end(contents);
        } catch {
            response.writeHead(404);
            response.end("Not found");
        }
    });
}

async function launchBrowser() {
    const executablePath = await findBrowserExecutable();

    if (executablePath !== undefined) {
        console.log(`Using browser executable: ${executablePath}`);
        return chromium.launch({ executablePath });
    }

    return chromium.launch();
}

async function findBrowserExecutable() {
    const candidates = [
        process.env.CHROME_EXECUTABLE_PATH,
        join(
            process.env.HOME ?? "",
            "Library/Caches/ms-playwright/chromium-1200/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
        ),
        join(
            process.env.HOME ?? "",
            "Library/Caches/ms-playwright/chromium-1200/chrome-mac/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
        ),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        "/opt/homebrew/bin/chromium",
        "/usr/local/bin/chromium",
        "/opt/homebrew/bin/google-chrome",
        "/usr/local/bin/google-chrome"
    ].filter(Boolean);

    for (const candidate of candidates) {
        if (await isExecutable(candidate)) {
            return candidate;
        }
    }
}

async function isExecutable(filePath) {
    try {
        await access(filePath, constants.X_OK);
        return true;
    } catch {
        return false;
    }
}

function listen(server) {
    return new Promise((resolveListen, rejectListen) => {
        server.once("error", rejectListen);
        server.listen(0, "127.0.0.1", () => {
            server.off("error", rejectListen);
            resolveListen();
        });
    });
}

function close(server) {
    return new Promise((resolveClose, rejectClose) => {
        server.close((error) => {
            if (error) {
                rejectClose(error);
                return;
            }

            resolveClose();
        });
    });
}
