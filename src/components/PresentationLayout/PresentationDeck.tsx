/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import styles from "./PresentationDeck.module.scss";
import classNames from "classnames";
import { usePortraitOrientationHint } from "./usePortraitOrientationHint";
import { useSlideAnchors } from "./useSlideAnchors";


/** Main region that contains the presentation slides. */
export default function PresentationDeck(props: PresentationDeckProps) {
    const { t } = useTranslation();
    const className = classNames(styles.deck, { [styles.disableTimelinePadding]: props.disableTimelinePadding });
    const deckRef = useRef<HTMLElement>(null);
    const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
    const orientationHint = usePortraitOrientationHint();

    useSlideAnchors(deckRef);

    useEffect(() => {
        const deck = deckRef.current;

        if (deck === null) {
            return;
        }

        const firstSlide = getFirstDeckSlide(deck);

        if (firstSlide === undefined) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsBackToTopVisible(entry.intersectionRatio < 0.5);
            },
            { root: deck, threshold: [0, 0.5, 1] },
        );

        observer.observe(firstSlide);

        return () => {
            observer.disconnect();
        };
    }, []);

    const scrollToTop = () => {
        deckRef.current?.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
    };

    return <main ref={deckRef} className={className} id="presentation">
        {props.children}
        <button
            type="button"
            className={styles.backToTop}
            data-visible={isBackToTopVisible}
            aria-label={t("presentation.backToTop")}
            tabIndex={isBackToTopVisible ? 0 : -1}
            onClick={scrollToTop}
        >
            <span aria-hidden="true">↑</span>
        </button>
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

function getFirstDeckSlide(deck: HTMLElement) {
    return Array.from(deck.children)
        .find((child): child is HTMLElement => child instanceof HTMLElement && child.id.length > 0);
}
