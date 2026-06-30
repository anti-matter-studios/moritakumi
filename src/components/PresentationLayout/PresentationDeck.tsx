/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type PropsWithChildren,
    type RefObject
} from "react";
import { useTranslation } from "react-i18next";

import styles from "./PresentationDeck.module.scss";
import classNames from "classnames";


/** Main region that contains the presentation slides. */
export default function PresentationDeck(props: PresentationDeckProps) {
    const { t } = useTranslation();
    const className = classNames(styles.deck, { [styles.disableTimelinePadding]: props.disableTimelinePadding });
    const deckRef = useRef<HTMLElement>(null);
    const orientationHint = usePortraitOrientationHint();

    useSlideAnchors(deckRef);

    return <main ref={deckRef} className={className} id="presentation">
        {props.children}
        <div
            className={styles.orientationOverlay}
            data-visible={orientationHint.isVisible}
            aria-hidden={!orientationHint.isVisible}
        >
            <div className={styles.orientationPrompt} role="status" aria-live="polite">
                <span className={styles.orientationAnimation} aria-hidden="true">
                    <span
                        className={styles.orientationDevice}
                        onAnimationEnd={orientationHint.hide}
                    />
                </span>
                <span>{t("presentation.orientationHint")}</span>
            </div>
        </div>
    </main>;
}

export interface PresentationDeckProps extends PropsWithChildren {
    /** If set, disables the left-hand side timeline padding. */
    disableTimelinePadding?: boolean;
}

function usePortraitOrientationHint() {
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

function useSlideAnchors(deckRef: RefObject<HTMLElement | null>) {
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

        const slides = getDeckSlides(deck);

        if (slides.length === 0) {
            return;
        }

        const slideVisibility = new Map<Element, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    slideVisibility.set(
                        entry.target,
                        entry.isIntersecting ? entry.intersectionRatio : 0,
                    );
                }

                const activeSlide = slides
                    .map((slide) => ({
                        slide,
                        visibility: slideVisibility.get(slide) ?? 0,
                    }))
                    .sort((first, second) => second.visibility - first.visibility)
                    .at(0);

                if (activeSlide !== undefined && activeSlide.visibility >= 0.5) {
                    replaceHash(activeSlide.slide.id);
                }
            },
            {
                root: deck,
                threshold: [0, 0.5, 0.75, 1],
            },
        );

        for (const slide of slides) {
            observer.observe(slide);
        }

        return () => {
            observer.disconnect();
        };
    }, [deckRef]);
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
