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
const contentPassword = process.env.MORITAKUMI_CONTENT_PASSWORD;

const pages = [
    { route: "index.html", fileName: "index.pdf", pageSize: "21cm 29.7cm", noTimeline: true },
    { route: "who-am-i", fileName: "who-am-i.pdf" },
    { route: "my-hobbies", fileName: "my-hobbies.pdf" },
    { route: "my-travels", fileName: "my-travels.pdf" },
    { route: "thanks", fileName: "thanks.pdf" }
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

    if (contentPassword !== undefined && contentPassword.length > 0) {
        await context.addInitScript((password) => {
            window.__MORITAKUMI_PDF_PASSWORD__ = password;
        }, contentPassword);
    }

    for (const pageConfig of pages) {
        const page = await context.newPage();
        const url = getPageUrl(origin, pageConfig.route);
        const outputPath = join(pdfDir, pageConfig.fileName);

        await page.goto(url, { waitUntil: "networkidle" });
        await unlockContentForPdf(page);
        if (pageConfig.pageSize !== undefined) {
            await preparePdfPageSize(page, pageConfig.pageSize);
        }
        if (!pageConfig.noTimeline) {
            await preparePdfTimeline(page);
        }
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

function getPageUrl(origin, route) {
    if (route.endsWith(".html")) {
        return `${origin}/${route}`;
    }

    return `${origin}/${route}.html`;
}

async function preparePdfPageSize(page, pageSize) {
    await page.addStyleTag({
        content: `
            @page {
                size: ${pageSize};
                margin: 0;
            }
        `
    });
}

async function unlockContentForPdf(page) {
    const password = await page.evaluate(() => window.__MORITAKUMI_PDF_PASSWORD__);

    if (typeof password !== "string" || password.length === 0) {
        return;
    }

    const passwordInput = page.locator('input[type="password"]');

    if (await passwordInput.count() === 0) {
        return;
    }

    await passwordInput.fill(password);
    await page.locator('button[type="submit"], button').first().click();
    await page.waitForSelector('input[type="password"]', { state: "detached" });
    await page.waitForLoadState("networkidle");
}

async function assertDistExists() {
    const stats = await stat(distDir);

    if (!stats.isDirectory()) {
        throw new Error(`${distDir} is not a directory.`);
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

async function preparePdfTimeline(page) {
    await page.addStyleTag({
        content: `
            @media print {
                aside[aria-label="Presentation timeline"] {
                    display: none !important;
                }

                .pdf-timeline {
                    position: absolute;
                    z-index: 2;
                    top: 50%;
                    left: var(--space-5);
                    width: var(--timeline-width);
                    transform: translateY(-50%);
                }

                .pdf-timeline__track {
                    position: relative;
                    display: grid;
                    gap: var(--space-3);
                    padding: var(--space-3) 0;
                }

                .pdf-timeline__track::before,
                .pdf-timeline__track::after {
                    position: absolute;
                    left: 0.875rem;
                    width: 0.125rem;
                    border-radius: 999rem;
                    content: "";
                }

                .pdf-timeline__track::before {
                    top: 1.25rem;
                    bottom: 1.25rem;
                    background: color-mix(in srgb, var(--color-timeline) 68%, transparent);
                }

                .pdf-timeline__track::after {
                    top: 1.25rem;
                    bottom: 1.25rem;
                    background: var(--color-timeline-active);
                    transform: scaleY(var(--pdf-timeline-progress));
                    transform-origin: top;
                }

                .pdf-timeline__item {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    grid-template-columns: 1.875rem minmax(0, 1fr);
                    gap: var(--space-3);
                    align-items: center;
                    min-height: 2.5rem;
                    color: var(--color-text);
                    font-size: 0.875rem;
                    font-weight: 700;
                    letter-spacing: 0;
                }

                .pdf-timeline__marker {
                    display: grid;
                    width: 1.875rem;
                    aspect-ratio: 1;
                    place-items: center;
                    border: 0.125rem solid var(--color-timeline);
                    border-radius: 50%;
                    background: var(--color-surface);
                    color: var(--color-muted);
                    font-size: 0.6875rem;
                }

                .pdf-timeline__label {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .pdf-timeline__item[data-active="true"] .pdf-timeline__marker {
                    border-color: var(--color-timeline-active);
                    background: var(--color-timeline-active);
                    color: var(--color-on-accent);
                }
            }
        `
    });

    await page.evaluate(() => {
        const slides = Array.from(document.querySelectorAll("section[id][data-nav-label]"));
        const items = slides.map((slide) => ({
            id: slide.id,
            label: slide.getAttribute("data-nav-label") ?? slide.id
        }));

        slides.forEach((slide, activeIndex) => {
            const timeline = document.createElement("aside");
            const track = document.createElement("nav");
            const progress = items.length > 1 ? activeIndex / (items.length - 1) : 0;

            timeline.className = "pdf-timeline";
            timeline.setAttribute("aria-hidden", "true");

            track.className = "pdf-timeline__track";
            track.style.setProperty("--pdf-timeline-progress", String(progress));

            items.forEach((item, itemIndex) => {
                const entry = document.createElement("div");
                const marker = document.createElement("span");
                const label = document.createElement("span");

                entry.className = "pdf-timeline__item";
                entry.dataset.active = String(item.id === slide.id);

                marker.className = "pdf-timeline__marker";
                marker.textContent = String(itemIndex + 1);

                label.className = "pdf-timeline__label";
                label.textContent = item.label;

                entry.append(marker, label);
                track.append(entry);
            });

            timeline.append(track);
            slide.append(timeline);
        });
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
