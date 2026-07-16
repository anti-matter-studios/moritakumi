/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useState } from "react";

const orientationHintDuration = 2_000;

/** Shows the rotate-device hint while the deck is viewed in portrait orientation. */
export function usePortraitOrientationHint() {
    const [isPortrait, setIsPortrait] = useState(isPortraitViewport);
    const [isVisible, setIsVisible] = useState(isPortraitViewport);

    useEffect(() => {
        const portraitQuery = window.matchMedia("(orientation: portrait)");
        const updateOrientation = () => {
            setIsPortrait(isPortraitViewport());
        };

        updateOrientation();
        window.addEventListener("resize", updateOrientation, { passive: true });
        portraitQuery.addEventListener("change", updateOrientation);

        return () => {
            window.removeEventListener("resize", updateOrientation);
            portraitQuery.removeEventListener("change", updateOrientation);
        };
    }, []);

    useEffect(() => {
        setIsVisible(isPortrait);
    }, [isPortrait]);

    useEffect(() => {
        if (!isPortrait || !isVisible) {
            return;
        }

        // Mobile browsers do not always dispatch animationend when rendering is
        // interrupted, so visibility must not depend on that event alone.
        const hideTimer = window.setTimeout(() => {
            setIsVisible(false);
        }, orientationHintDuration);

        return () => {
            window.clearTimeout(hideTimer);
        };
    }, [isPortrait, isVisible]);

    return {
        isVisible: isPortrait && isVisible,
        hide: () => {
            setIsVisible(false);
        },
    };
}

function isPortraitViewport() {
    if (typeof window === "undefined") {
        return false;
    }

    return window.matchMedia("(orientation: portrait)").matches;
}
