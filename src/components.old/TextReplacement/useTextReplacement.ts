/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const shuffleFrameCount = 5;
const shuffleFrameMs = 28;
const replacementFrameMs = 34;
const revealStepCount = 2;

export function useTextReplacement(options: UseTextReplacementOptions) {
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

        if (prefersReducedMotion()) {
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
                () => runReveal(revealedCount + revealStepCount),
                replacementFrameMs,
            );
        };

        const runShuffle = (frame: number) => {
            if (frame >= shuffleFrameCount) {
                runReveal(0);
                return;
            }

            setDisplayedText(shuffleSourceLetters(sourceLetters));
            timeoutRef.current = window.setTimeout(
                () => runShuffle(frame + 1),
                shuffleFrameMs,
            );
        };

        runShuffle(0);
    }, [clearTimer, setDisplayedText]);

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

export interface UseTextReplacementOptions {
    /** Text displayed before interaction. */
    text: string;

    /** Text progressively revealed during interaction. */
    replacement: string;
}
