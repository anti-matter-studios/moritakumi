/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useState, type RefObject } from "react";

/** Activates expensive colour-shift backgrounds only while their slide is visible. */
export function useAnimatedBackground(enabled: boolean, slideRef: RefObject<HTMLElement | null>) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const slide = slideRef.current;

        if (slide === null) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            return activateOnNextFrame(setIsActive);
        }

        const deck = document.getElementById("presentation");
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries.find((observedEntry) => observedEntry.target === slide);

                if (entry === undefined) {
                    return;
                }

                setIsActive(entry.isIntersecting && entry.intersectionRatio >= 0.6);
            },
            { root: deck, threshold: [0, 0.6] },
        );

        observer.observe(slide);

        return () => {
            observer.disconnect();
        };
    }, [enabled, slideRef]);

    return enabled && isActive;
}

function activateOnNextFrame(setIsActive: (value: boolean) => void) {
    const animationFrame = globalThis.requestAnimationFrame(() => {
        setIsActive(true);
    });

    return () => {
        globalThis.cancelAnimationFrame(animationFrame);
    };
}
