/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { randomCharacters } from "./textReplacementCharacters";
import {
    createRandomOrder,
    createReplacementFrame,
    shuffleSourceLetters,
} from "./textReplacementFrames";
import { createTiming } from "./textReplacementTiming";

/** Animates a short piece of text between an original and replacement value. */
export function useTextReplacement(options: UseTextReplacementOptions) {
    const timing = useMemo(() => createTiming(options), [options]);

    const [displayText, setDisplayText] = useState(options.text);
    const displayTextRef = useRef(options.text);
    const currentTargetRef = useRef<TextReplacementTarget>("original");
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

    const animateTo = useCallback(
        (targetText: string, target: TextReplacementTarget) => {
            clearTimer();

            const shouldAnimate = (
                displayTextRef.current !== targetText ||
                currentTargetRef.current !== target
            );
            currentTargetRef.current = target;

            if (prefersReducedMotion() || !shouldAnimate) {
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
                        options.characterSet === "reduced" ? targetLetters : randomCharacters,
                    )
                );

                timeoutRef.current = window.setTimeout(
                    () => {
                        runReveal(revealedCount + timing.revealStepCount);
                    },
                    timing.replacementFrameMs
                );
            };

            const runShuffle = (frame: number) => {
                if (frame >= timing.shuffleFrameCount) {
                    runReveal(0);
                    return;
                }

                setDisplayedText(shuffleSourceLetters(sourceLetters));
                timeoutRef.current = window.setTimeout(
                    () => {
                        runShuffle(frame + 1);
                    },
                    timing.shuffleFrameMs
                );
            };

            runShuffle(0);
        },
        [
            clearTimer,
            options.characterSet,
            setDisplayedText,
            timing.replacementFrameMs,
            timing.revealStepCount,
            timing.shuffleFrameCount,
            timing.shuffleFrameMs,
        ]
    );

    const showReplacement = useCallback(() => {
        animateTo(options.replacement, "replacement");
    }, [animateTo, options.replacement]);

    const showOriginal = useCallback(() => {
        animateTo(options.text, "original");
    }, [animateTo, options.text]);

    useEffect(() => {
        currentTargetRef.current = "original";

        const animationFrame = window.requestAnimationFrame(() => {
            setDisplayedText(options.text);
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
        };
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

export type TextReplacementSpeed = "slow" | "normal" | "fast" | `${number}` | number;

type TextReplacementTarget = "original" | "replacement";

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

    /** Character set to use for the replacement effect. */
    characterSet?: "full" | "reduced";
}
