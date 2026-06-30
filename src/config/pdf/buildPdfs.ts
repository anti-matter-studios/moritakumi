/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Browser } from "playwright";

import { launchBrowser } from "./browser";
import pdfPages from "./pages";
import {
    preparePdfPageSize,
    preparePdfTimeline,
    unlockContentForPdf,
} from "./pagePreparation";
import { assertDistExists, close, createStaticServer, listen } from "./staticServer";

const rootDir = resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const distDir = resolve(rootDir, "dist");
const pdfDir = resolve(distDir, "pdfs");
const contentPassword = process.env.MORITAKUMI_CONTENT_PASSWORD;

await assertDistExists(distDir);
await mkdir(pdfDir, { recursive: true });

const server = createStaticServer(distDir);
const port = await listen(server);

const origin = `http://127.0.0.1:${port.toString()}`;
let browser: Browser | undefined;

try {
    browser = await launchBrowser();

    const context = await browser.newContext({
        locale: "fr-FR",
        viewport: { width: 1920, height: 1080 },
    });

    if (contentPassword !== undefined && contentPassword.length > 0) {
        await context.addInitScript((password) => {
            window.__MORITAKUMI_PDF_PASSWORD__ = password;
        }, contentPassword);
    }

    for (const pageConfig of pdfPages) {
        const page = await context.newPage();
        const outputPath = join(pdfDir, pageConfig.fileName);

        await page.goto(getPageUrl(origin, pageConfig.route), { waitUntil: "networkidle" });
        await unlockContentForPdf(page);

        if (pageConfig.pageSize !== undefined) {
            await preparePdfPageSize(page, pageConfig.pageSize);
        }

        if (pageConfig.noTimeline !== true) {
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

function getPageUrl(originUrl: string, route: string) {
    return route.endsWith(".html") ? `${originUrl}/${route}` : `${originUrl}/${route}.html`;
}
