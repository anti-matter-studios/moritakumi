/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

/** Launches Chromium, preferring locally installed browser binaries when present. */
export async function launchBrowser() {
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
            "Library/Caches/ms-playwright/chromium-1200/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
        ),
        join(
            process.env.HOME ?? "",
            "Library/Caches/ms-playwright/chromium-1200/chrome-mac/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
        ),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        "/opt/homebrew/bin/chromium",
        "/usr/local/bin/chromium",
        "/opt/homebrew/bin/google-chrome",
        "/usr/local/bin/google-chrome",
    ].filter((candidate): candidate is string => typeof candidate === "string");

    for (const candidate of candidates) {
        if (await isExecutable(candidate)) {
            return candidate;
        }
    }

    return undefined;
}

async function isExecutable(filePath: string) {
    try {
        await access(filePath, constants.X_OK);
        return true;
    } catch {
        return false;
    }
}
