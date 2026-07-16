/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useRef, useState } from "react";


/** Hook used to decide if the navbar should be visible while scrolling the page. */
export default function useVisible() {
    const [isVisible, setIsVisible] = useState(true);
    const hasTouchInteraction = useRef(false);
    const lastScrollTop = useRef(0);
    const scrollFrame = useRef<number | null>(null);

    useEffect(() => {
        const scrollContainer = document.getElementById("presentation");

        function hideOnMobileTouch() {
            hasTouchInteraction.current = true;
            setIsVisible(false);
        }

        function updateVisibility() {
            if (scrollFrame.current !== null) {
                cancelAnimationFrame(scrollFrame.current);
            }

            scrollFrame.current = requestAnimationFrame(() => {
                const scrollTop = scrollContainer?.scrollTop ?? document.scrollingElement?.scrollTop ?? window.scrollY;
                const scrollDelta = scrollTop - lastScrollTop.current;

                if (!hasTouchInteraction.current) {
                    setIsVisible(true);
                } else if (scrollDelta > 8) {
                    setIsVisible(false);
                } else if (scrollDelta < -8) {
                    setIsVisible(true);
                }

                lastScrollTop.current = scrollTop;
            });
        }

        const target = scrollContainer ?? window;
        target.addEventListener("scroll", updateVisibility, { passive: true });
        target.addEventListener("touchstart", hideOnMobileTouch, { passive: true });

        return () => {
            target.removeEventListener("scroll", updateVisibility);
            target.removeEventListener("touchstart", hideOnMobileTouch);

            if (scrollFrame.current !== null) {
                cancelAnimationFrame(scrollFrame.current);
            }
        };
    }, []);

    return isVisible;
}
