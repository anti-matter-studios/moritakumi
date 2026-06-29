/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useRef, useState, type PropsWithChildren, type RefObject } from "react";

import BackgroundImage, {
    type BackgroundImageProps
} from "@/components/BackgroundImage";
import SlideCard, { type SlideCardProps } from "./SlideCard";
import SlideHeader, { type SlideHeaderProps } from "./SlideHeader";
import styles from "./index.module.scss";
import classNames from "classnames";


export { SlideCard, SlideHeader };
export type { SlideCardProps, SlideHeaderProps };

/** Full-screen presentation slide. */
export default function Slide(props: SlideProps) {
    const className = classNames(styles.slide, { [styles.fullWidth]: props.fullWidth  });
    const slideRef = useRef<HTMLElement>(null);
    const isBackgroundAnimationActive = useAnimatedBackground(props.tone === "colour-shift", slideRef);

    return <section
        ref={slideRef}
        className={className}
        data-tone={props.tone ?? "default"}
        data-background-animation={isBackgroundAnimationActive ? "ready" : undefined}
        id={props.id}
        aria-label={props.navLabel}
        data-nav-label={props.navLabel}
        data-short-nav-label={props.shortNavLabel}
    >
        {props.backgroundImage && <BackgroundImage {...props.backgroundImage} />}
        <div className={styles.content}>
            {props.children}
        </div>
    </section>;
}

function useAnimatedBackground(enabled: boolean, slideRef: RefObject<HTMLElement | null>) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!enabled) {
            setIsActive(false);
            return;
        }

        const slide = slideRef.current;

        if (slide === null) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            setIsActive(true);
            return;
        }

        const deck = document.getElementById("presentation");
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries.find((observedEntry) => observedEntry.target === slide);

                if (entry === undefined) {
                    return;
                }

                if (!entry.isIntersecting) {
                    setIsActive(false);
                    return;
                }

                if (entry.intersectionRatio >= 0.6) {
                    setIsActive(true);
                }
            },
            {
                root: deck,
                threshold: [0, 0.6],
            },
        );

        observer.observe(slide);

        return () => {
            observer.disconnect();
        };
    }, [enabled, slideRef]);

    return isActive;
}

/** Grid used to group reusable slide cards. */
export function SlideCardList({ children }: SlideCardGridProps) {
    return <div className={styles.cardList}>{children}</div>;
}

export interface SlideProps extends PropsWithChildren {
    /** Unique identifier used for anchors, timelines, and active-section tracking. */
    id: string;

    /** Human-readable label for navigation and accessibility. */
    navLabel: string;

    /** Shorter label for compact timeline or navigation surfaces. */
    shortNavLabel?: string;

    /** Visual tone applied to the slide background. */
    tone?: "default" | "soft" | "strong" | "plain" | "colour-shift";

    /** Image to render in the background. */
    backgroundImage?: BackgroundImageProps;

    /** If set, disables the left-right disposition of the slide. */
    fullWidth?: boolean;
}

type SlideCardGridProps = PropsWithChildren;
