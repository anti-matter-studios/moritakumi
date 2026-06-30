/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { Page } from "playwright";

/** Applies route-specific print dimensions before rendering a PDF. */
export async function preparePdfPageSize(page: Page, pageSize: string) {
    await page.addStyleTag({
        content: `
            @page {
                size: ${pageSize};
                margin: 0;
            }
        `,
    });
}

/** Unlocks encrypted content in the browser before printing protected pages. */
export async function unlockContentForPdf(page: Page) {
    const password = await page.evaluate(() => window.__MORITAKUMI_PDF_PASSWORD__);
    const passwordInput = page.locator('input[type="password"]');

    if (await passwordInput.count() === 0) {
        return;
    }

    if (typeof password !== "string" || password.length === 0) {
        throw new Error(
            "PDF generation reached the content lock. Set MORITAKUMI_CONTENT_PASSWORD before running build:pdf.",
        );
    }

    await passwordInput.fill(password);
    await page.locator('button[type="submit"], button').first().click();
    await page.waitForSelector('input[type="password"]', { state: "detached" });
    await page.waitForLoadState("networkidle");
    await waitForContentImages(page);

    if (await passwordInput.count() > 0) {
        throw new Error("PDF generation could not unlock encrypted content.");
    }
}

/** Waits until decrypted image object URLs have replaced temporary placeholders. */
export async function waitForContentImages(page: Page) {
    await page.waitForSelector('[data-content-image-placeholder="true"]', {
        state: "detached",
        timeout: 15_000,
    }).catch(() => undefined);
    await page.waitForFunction(() => (
        Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0)
    ));
}

/** Adds a static timeline to every slide so printed pages remain navigable. */
export async function preparePdfTimeline(page: Page) {
    await page.addStyleTag({ content: getPdfTimelineStyles() });
    await page.evaluate(() => {
        const slides = Array.from(document.querySelectorAll("section[id][data-nav-label]"));
        const items = slides.map((slide) => ({
            id: slide.id,
            label: slide.getAttribute("data-nav-label") ?? slide.id,
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

function getPdfTimelineStyles() {
    return `
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
    `;
}
