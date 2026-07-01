/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { constants } from "node:fs";
import {
    access,
    mkdir,
    readFile,
    writeFile
} from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { Page } from "playwright";

import type { SchoolMapLocation } from "../../pages/schoolMapLocations";

const tileSize = 256;
const tileEndpoint = "https://tile.openstreetmap.org";
const userAgent = "moritakumi-map-export/1.0 (https://moritakumi.dev.anti-matter.studio)";

export const mapImageSize = {
    width: 760,
    height: 460
} as const;

export const defaultTileZoom = 14;

export interface RenderMapOptions {
    /** Project root used for the tile cache. */
    root: string;

    /** Whether to refresh the tile cache before composing the map. */
    refresh: boolean;
}

interface TileRequest {
    url: string;
    cachePath: string;
}

/** Creates one cached PNG from the OSM tiles covering the map center. */
export async function renderMapPng(
    page: Page,
    map: SchoolMapLocation,
    outputPath: string,
    options: RenderMapOptions
) {
    const viewport = buildTileViewport(map);
    const tiles = await Promise.all(viewport.tiles.map(async (tile) => ({
        ...tile,
        src: await getTileDataUrl(tile, options)
    })));

    await page.setContent(buildMapHtml(tiles), { waitUntil: "load" });
    await mkdir(dirname(outputPath), { recursive: true });
    await page.screenshot({ path: outputPath, type: "png" });
}

export function getOpenStreetMapUserAgent() {
    return userAgent;
}

async function getTileDataUrl(tile: TileRequest, options: RenderMapOptions) {
    const cachePath = resolve(options.root, tile.cachePath);

    await mkdir(dirname(cachePath), { recursive: true });

    if (!options.refresh && await fileExists(cachePath)) {
        return `data:image/png;base64,${(await readFile(cachePath)).toString("base64")}`;
    }

    const response = await fetch(tile.url, {
        headers: { "user-agent": userAgent }
    });

    if (!response.ok) {
        throw new Error(`OpenStreetMap tile request failed: ${response.status} ${tile.url}`);
    }

    const tileBytes = Buffer.from(await response.arrayBuffer());

    await writeFile(cachePath, tileBytes);

    return `data:image/png;base64,${tileBytes.toString("base64")}`;
}

async function fileExists(path: string) {
    try {
        await access(path, constants.F_OK);

        return true;
    } catch {
        return false;
    }
}

function buildTileViewport(map: SchoolMapLocation) {
    const zoom = map.zoom ?? defaultTileZoom;
    const center = projectToTilePixel(map.latitude, map.longitude, zoom);
    const left = center.x - mapImageSize.width / 2;
    const top = center.y - mapImageSize.height / 2;
    const startTileX = Math.floor(left / tileSize);
    const endTileX = Math.floor((left + mapImageSize.width) / tileSize);
    const startTileY = Math.floor(top / tileSize);
    const endTileY = Math.floor((top + mapImageSize.height) / tileSize);
    const tileCount = 2 ** zoom;
    const tiles = [];

    for (let y = startTileY; y <= endTileY; y += 1) {
        for (let x = startTileX; x <= endTileX; x += 1) {
            const wrappedX = ((x % tileCount) + tileCount) % tileCount;

            tiles.push({
                url: `${tileEndpoint}/${zoom}/${wrappedX}/${y}.png`,
                cachePath: `public/images/maps/tiles/${zoom}/${wrappedX}/${y}.png`,
                left: x * tileSize - left,
                top: y * tileSize - top
            });
        }
    }

    return { tiles };
}

function projectToTilePixel(latitude: number, longitude: number, zoom: number) {
    const scale = tileSize * 2 ** zoom;
    const latitudeRadians = latitude * Math.PI / 180;

    return {
        x: (longitude + 180) / 360 * scale,
        y: (
            1 - Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians)) / Math.PI
        ) / 2 * scale
    };
}

function buildMapHtml(tiles: Array<TileRequest & { src: string; left: number; top: number }>) {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
html,
body {
    width: ${mapImageSize.width}px;
    height: ${mapImageSize.height}px;
    margin: 0;
    overflow: hidden;
}

.map {
    position: relative;
    width: ${mapImageSize.width}px;
    height: ${mapImageSize.height}px;
    overflow: hidden;
    background: #dce7e3;
}

.tile {
    position: absolute;
    width: ${tileSize}px;
    height: ${tileSize}px;
}
</style>
</head>
<body>
<div class="map">
${tiles.map((tile) => `<img class="tile" alt="" src="${tile.src}" style="left:${tile.left}px;top:${tile.top}px;" />`).join("")}
</div>
</body>
</html>`;
}
