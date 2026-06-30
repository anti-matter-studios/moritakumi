/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { Placement } from "@popperjs/core";

const placements = [
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "right",
    "right-start",
    "right-end",
    "left",
    "left-start",
    "left-end",
] satisfies Placement[];

export function normalizePlacement(value: Placement | undefined): Placement {
    return placements.includes(value as Placement) ? value as Placement : "top";
}
