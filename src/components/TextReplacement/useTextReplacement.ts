/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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


/** Animates a short piece of text between an original and replacement value. */
export function useTextReplacement(options: UseTextReplacementOptions) {
    const timing = useMemo(() => createTiming(options), [
        options.replacementFrameMs,
        options.revealStepCount,
        options.shuffleFrameCount,
        options.shuffleFrameMs,
        options.speed,
    ]);

    const [displayText, setDisplayText] = useState(options.text);
    const displayTextRef = useRef(options.text);
    const timeoutRef = useRef<number | undefined>(undefined);

    const setDisplayedText = useCallback((text: string) => {
        displayTextRef.current = text;
        setDisplayText(text);
    }, []);

    const clearTimer = useCallback(() => {
        if (timeoutRef.current !== undefined) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }, []);

    const animateTo = useCallback((targetText: string) => {
        clearTimer();

        if (prefersReducedMotion() || displayTextRef.current === targetText) {
            setDisplayedText(targetText);
            return;
        }

        const sourceLetters = Array.from(displayTextRef.current);
        const targetLetters = Array.from(targetText);
        const revealOrder = createRandomOrder(targetLetters.length);

        const runReveal = (revealedCount: number) => {
            if (revealedCount > targetLetters.length) {
                setDisplayedText(targetText);
                return;
            }

            setDisplayedText(
                createReplacementFrame(
                    sourceLetters,
                    targetLetters,
                    revealedCount,
                    revealOrder,
                ),
            );

            timeoutRef.current = window.setTimeout(
                () => runReveal(revealedCount + timing.revealStepCount),
                timing.replacementFrameMs,
            );
        };

        const runShuffle = (frame: number) => {
            if (frame >= timing.shuffleFrameCount) {
                runReveal(0);
                return;
            }

            setDisplayedText(shuffleSourceLetters(sourceLetters));
            timeoutRef.current = window.setTimeout(
                () => runShuffle(frame + 1),
                timing.shuffleFrameMs,
            );
        };

        runShuffle(0);
    }, [clearTimer, setDisplayedText, timing]);

    const showReplacement = useCallback(() => {
        animateTo(options.replacement);
    }, [animateTo, options.replacement]);

    const showOriginal = useCallback(() => {
        animateTo(options.text);
    }, [animateTo, options.text]);

    useEffect(() => {
        setDisplayedText(options.text);
    }, [options.text, setDisplayedText]);

    useEffect(() => clearTimer, [clearTimer]);

    return {
        displayText,
        showOriginal,
        showReplacement,
    };
}

function createTiming(options: UseTextReplacementOptions) {
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

    if (!Number.isFinite(speedFactor) || speedFactor <= 0) {
        return speedFactors.normal;
    }

    return speedFactor;
}

function parsePositiveInteger(value: number | string | undefined, fallback: number) {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
        return fallback;
    }

    return Math.max(1, Math.round(parsedValue));
}

function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

function shuffleSourceLetters(sourceLetters: string[]) {
    const pool = sourceLetters.filter((letter) => letter !== " ");

    return sourceLetters
        .map((letter) => {
            if (letter === " " || pool.length === 0) {
                return letter;
            }

            const index = Math.floor(Math.random() * pool.length);
            const [nextLetter] = pool.splice(index, 1);

            return nextLetter;
        })
        .join("");
}

function createReplacementFrame(
    sourceLetters: string[],
    targetLetters: string[],
    revealedCount: number,
    revealOrder: number[],
) {
    const frameLength = Math.max(sourceLetters.length, targetLetters.length);
    const shuffledLetters = Array.from(shuffleSourceLetters(sourceLetters));
    const revealedIndexes = new Set(revealOrder.slice(0, revealedCount));

    return Array.from({ length: frameLength }, (_letter, index) => {
        if (revealedIndexes.has(index)) {
            return targetLetters[index] ?? "";
        }

        if (shuffledLetters.length === 0) {
            return "";
        }

        return shuffledLetters[index % shuffledLetters.length] ?? "";
    }).join("").trimEnd();
}

function createRandomOrder(length: number) {
    const order = Array.from({ length }, (_item, index) => index);

    for (let index = order.length - 1; index > 0; index -= 1) {
        const nextIndex = Math.floor(Math.random() * (index + 1));
        [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
    }

    return order;
}

export type TextReplacementSpeed = "slow" | "normal" | "fast" | `${number}` | number;

export interface UseTextReplacementOptions {
    /** Text displayed before interaction. */
    text: string;

    /** Text progressively revealed during interaction. */
    replacement: string;

    /** Preset or numeric multiplier for the animation speed. */
    speed?: TextReplacementSpeed;

    /** Number of pre-reveal shuffle frames. */
    shuffleFrameCount?: number | string;

    /** Delay between shuffle frames. */
    shuffleFrameMs?: number | string;

    /** Delay between reveal frames. */
    replacementFrameMs?: number | string;

    /** Number of characters revealed on each replacement frame. */
    revealStepCount?: number | string;
}
