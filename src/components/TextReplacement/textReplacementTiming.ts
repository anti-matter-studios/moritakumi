/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { TextReplacementSpeed, UseTextReplacementOptions } from "./useTextReplacement";

const defaultTiming = {
    shuffleFrameCount: 5,
    shuffleFrameMs: 28,
    replacementFrameMs: 34,
    revealStepCount: 2,
} as const;

const speedFactors = {
    slow: 0.7,
    normal: 1,
    fast: 1.6,
} as const;

export function createTiming(options: UseTextReplacementOptions) {
    const speedFactor = parseSpeed(options.speed);

    return {
        shuffleFrameCount: parsePositiveInteger(
            options.shuffleFrameCount,
            defaultTiming.shuffleFrameCount,
        ),
        shuffleFrameMs: parsePositiveInteger(
            options.shuffleFrameMs,
            Math.round(defaultTiming.shuffleFrameMs / speedFactor),
        ),
        replacementFrameMs: parsePositiveInteger(
            options.replacementFrameMs,
            Math.round(defaultTiming.replacementFrameMs / speedFactor),
        ),
        revealStepCount: parsePositiveInteger(
            options.revealStepCount,
            Math.max(1, Math.round(defaultTiming.revealStepCount * speedFactor)),
        ),
    };
}

function parseSpeed(speed: TextReplacementSpeed | undefined) {
    if (speed === undefined) {
        return speedFactors.normal;
    }

    if (speed in speedFactors) {
        return speedFactors[speed as keyof typeof speedFactors];
    }

    const speedFactor = Number(speed);

    return Number.isFinite(speedFactor) && speedFactor > 0
        ? speedFactor
        : speedFactors.normal;
}

function parsePositiveInteger(value: number | string | undefined, fallback: number) {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
        return fallback;
    }

    return Math.max(1, Math.round(parsedValue));
}
