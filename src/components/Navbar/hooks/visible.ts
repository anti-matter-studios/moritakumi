/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useRef, useState } from "react";


/** Hook used to decide if the navbar should be visible while scrolling the page. */
export default function useVisible() {
    const [isVisible, setIsVisible] = useState(true);
    const lastTouchEndAt = useRef(0);
    const lastScrollTop = useRef(0);
    const scrollFrame = useRef<number | null>(null);

    useEffect(() => {
        const scrollContainer = document.getElementById("presentation");

        function rememberTouchEnd() {
            lastTouchEndAt.current = Date.now();
        }

        function toggleOnTouchClick() {
            const followedTouch = Date.now() - lastTouchEndAt.current < 750;

            if (!followedTouch) {
                return;
            }

            lastTouchEndAt.current = 0;
            setIsVisible((visible) => !visible);
        }

        function updateVisibility() {
            if (scrollFrame.current !== null) {
                cancelAnimationFrame(scrollFrame.current);
            }

            scrollFrame.current = requestAnimationFrame(() => {
                const scrollTop = scrollContainer?.scrollTop ?? document.scrollingElement?.scrollTop ?? window.scrollY;
                const scrollDelta = scrollTop - lastScrollTop.current;

                if (scrollDelta > 8) {
                    setIsVisible(false);
                } else if (scrollDelta < -8) {
                    setIsVisible(true);
                }

                lastScrollTop.current = scrollTop;
            });
        }

        const target = scrollContainer ?? window;
        target.addEventListener("scroll", updateVisibility, { passive: true });
        target.addEventListener("touchend", rememberTouchEnd, { passive: true });
        target.addEventListener("click", toggleOnTouchClick);

        return () => {
            target.removeEventListener("scroll", updateVisibility);
            target.removeEventListener("touchend", rememberTouchEnd);
            target.removeEventListener("click", toggleOnTouchClick);

            if (scrollFrame.current !== null) {
                cancelAnimationFrame(scrollFrame.current);
            }
        };
    }, []);

    return isVisible;
}
