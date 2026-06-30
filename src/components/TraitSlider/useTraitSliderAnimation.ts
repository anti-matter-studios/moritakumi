/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useRef, useState, type RefObject } from "react";

import { centerValue, clamp } from "./traitSliderValue";

const animationDurationMs = 1_600;

/** Animates the read-only slider when it enters the presentation viewport. */
export function useTraitSliderAnimation(
    sliderRef: RefObject<HTMLSpanElement | null>,
    value: number,
    enabled: boolean,
) {
    const animationFrameRef = useRef<number | undefined>(undefined);
    const isVisibleRef = useRef(false);
    const [displayValue, setDisplayValue] = useState(centerValue);

    useEffect(() => {
        const slider = sliderRef.current;

        if (!enabled || slider === null) {
            return;
        }

        const cancelAnimation = createAnimationCancellation(animationFrameRef);
        const animateToValue = () => {
            runSliderAnimation(value, setDisplayValue, animationFrameRef, cancelAnimation);
        };

        if (!("IntersectionObserver" in window)) {
            animateToValue();
            return cancelAnimation;
        }

        const observer = observeSlider(slider, isVisibleRef, animateToValue, () => {
            cancelAnimation();
            setDisplayValue(centerValue);
        });

        return () => {
            isVisibleRef.current = false;
            observer.disconnect();
            cancelAnimation();
        };
    }, [enabled, sliderRef, value]);

    return displayValue;
}

function runSliderAnimation(
    value: number,
    setDisplayValue: (value: number) => void,
    animationFrameRef: RefObject<number | undefined>,
    cancelAnimation: () => void,
) {
    cancelAnimation();

    if (prefersReducedMotion()) {
        setDisplayValue(value);
        return;
    }

    let startedAt: number | undefined;
    setDisplayValue(centerValue);

    const update = (timestamp: number) => {
        startedAt ??= timestamp;

        const progress = clamp((timestamp - startedAt) / animationDurationMs, 0, 1);
        const easedProgress = easeOutCubic(progress);
        const nextValue = centerValue + ((value - centerValue) * easedProgress);

        setDisplayValue(progress === 1 ? value : nextValue);

        if (progress < 1) {
            animationFrameRef.current = window.requestAnimationFrame(update);
        }
    };

    animationFrameRef.current = window.requestAnimationFrame(update);
}

function observeSlider(
    slider: HTMLSpanElement,
    isVisibleRef: RefObject<boolean>,
    animateToValue: () => void,
    resetValue: () => void,
) {
    const deck = document.getElementById("presentation");
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries.find((observedEntry) => observedEntry.target === slider);

            if (entry?.isIntersecting === true) {
                if (!isVisibleRef.current) {
                    isVisibleRef.current = true;
                    animateToValue();
                }
                return;
            }

            isVisibleRef.current = false;
            resetValue();
        },
        { root: deck, threshold: 0.35 },
    );

    observer.observe(slider);
    return observer;
}

function createAnimationCancellation(animationFrameRef: RefObject<number | undefined>) {
    return () => {
        if (animationFrameRef.current !== undefined) {
            window.cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
        }
    };
}

function easeOutCubic(value: number) {
    return 1 - ((1 - value) ** 3);
}

function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}
