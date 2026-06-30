/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useLayoutEffect, type RefObject } from "react";

/** Keeps URL hashes and deck scroll position aligned with the active slide. */
export function useSlideAnchors(deckRef: RefObject<HTMLElement | null>) {
    useLayoutEffect(() => {
        const deck = deckRef.current;

        if (deck === null) {
            return;
        }

        scrollDeckToHash(deck, "auto");

        const scrollToCurrentHash = () => {
            scrollDeckToHash(deck, "smooth");
        };

        window.addEventListener("hashchange", scrollToCurrentHash);

        return () => {
            window.removeEventListener("hashchange", scrollToCurrentHash);
        };
    }, [deckRef]);

    useEffect(() => {
        const deck = deckRef.current;

        if (deck === null) {
            return;
        }

        return observeActiveSlide(deck);
    }, [deckRef]);
}

function observeActiveSlide(deck: HTMLElement) {
    const slides = getDeckSlides(deck);

    if (slides.length === 0) {
        return undefined;
    }

    const slideVisibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                slideVisibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
            }

            const activeSlide = slides
                .map((slide) => ({ slide, visibility: slideVisibility.get(slide) ?? 0 }))
                .sort((first, second) => second.visibility - first.visibility)
                .at(0);

            if (activeSlide !== undefined && activeSlide.visibility >= 0.5) {
                replaceHash(activeSlide.slide.id);
            }
        },
        { root: deck, threshold: [0, 0.5, 0.75, 1] },
    );

    for (const slide of slides) {
        observer.observe(slide);
    }

    return () => {
        observer.disconnect();
    };
}

function scrollDeckToHash(deck: HTMLElement, behavior: ScrollBehavior) {
    const targetSlideId = getCurrentHashId();

    if (targetSlideId === undefined) {
        return;
    }

    const targetSlide = document.getElementById(targetSlideId);

    if (targetSlide !== null && deck.contains(targetSlide)) {
        targetSlide.scrollIntoView({ block: "start", behavior });
    }
}

function getDeckSlides(deck: HTMLElement) {
    return Array.from(deck.children)
        .filter((child): child is HTMLElement => child instanceof HTMLElement)
        .filter((child) => child.id.length > 0);
}

function replaceHash(slideId: string) {
    if (getCurrentHashId() === slideId) {
        return;
    }

    const url = new URL(window.location.href);
    url.hash = slideId;
    window.history.replaceState(window.history.state, "", url);
}

function getCurrentHashId() {
    const hash = window.location.hash;

    if (hash.length <= 1) {
        return undefined;
    }

    try {
        return decodeURIComponent(hash.slice(1));
    } catch {
        return hash.slice(1);
    }
}
