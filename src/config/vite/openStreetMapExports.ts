/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

import { schoolMapLocations } from "../../pages/schoolMapLocations";
import {
    getOpenStreetMapUserAgent,
    mapImageSize,
    renderMapPng
} from "./openStreetMapTileRenderer";

/** Caches selected OpenStreetMap tile views into public/ before builds. */
export default function openStreetMapExports(): Plugin {
    let config: ResolvedConfig;

    return {
        name: "openstreetmap-exports",
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        async buildStart() {
            try {
                await generateOpenStreetMapExports(config.root);
            } catch (error) {
                this.error(error instanceof Error ? error.message : String(error));
            }
        }
    };
}

export async function generateOpenStreetMapExports(root: string, options: GenerateMapOptions = {}) {
    const refresh = options.refresh ?? shouldRefreshMaps();
    const mapsToRender = await getMapsToRender(root, refresh);

    if (mapsToRender.length === 0) {
        return;
    }

    const { chromium } = await import("playwright");
    const browser = await chromium.launch();

    try {
        const page = await browser.newPage({
            userAgent: getOpenStreetMapUserAgent(),
            viewport: mapImageSize
        });

        for (const { map, outputPath } of mapsToRender) {
            await renderMapPng(page, map, outputPath, { root, refresh });
        }
    } finally {
        await browser.close();
    }
}

interface GenerateMapOptions {
    /** Regenerate final map PNGs and refresh cached tiles. */
    refresh?: boolean;
}

type SchoolMapExport = typeof schoolMapLocations[keyof typeof schoolMapLocations];

interface MapRenderTarget {
    map: SchoolMapExport;
    outputPath: string;
}

function shouldRefreshMaps() {
    return process.env.OSM_TILE_REFRESH === "1";
}

async function getMapsToRender(root: string, refresh: boolean) {
    const maps = Object.values(schoolMapLocations);
    const uniqueMaps = new Map(maps.map((map) => [map.imageSrc, map]));
    const renderTargets: MapRenderTarget[] = [];

    for (const [imageSrc, map] of uniqueMaps) {
        const outputPath = resolve(root, "public", imageSrc.replace(/^\//, ""));

        if (!refresh && await fileExists(outputPath)) {
            continue;
        }

        renderTargets.push({ map, outputPath });
    }

    return renderTargets;
}

async function fileExists(path: string) {
    try {
        await access(path, constants.F_OK);

        return true;
    } catch {
        return false;
    }
}
