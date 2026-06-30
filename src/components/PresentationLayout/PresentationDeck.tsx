/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useRef, type PropsWithChildren } from "react";
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
