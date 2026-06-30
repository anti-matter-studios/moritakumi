/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useRef, type PropsWithChildren } from "react";

import BackgroundImage, {
    type BackgroundImageProps
} from "@/components/BackgroundImage";
import SlideCard, { type SlideCardProps } from "./SlideCard";
import SlideCardList from "./SlideCardList";
import SlideHeader, { type SlideHeaderProps } from "./SlideHeader";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useAnimatedBackground } from "./useAnimatedBackground";


export { SlideCard, SlideHeader };
export { SlideCardList };
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
        data-slide-id={props.slideId ?? props.id}
        data-nav-label={props.navLabel}
        data-short-nav-label={props.shortNavLabel}
    >
        {props.backgroundImage && <BackgroundImage {...props.backgroundImage} />}
        <div className={styles.content}>
            {props.children}
        </div>
    </section>;
}

export interface SlideProps extends PropsWithChildren {
    /** Unique identifier used for anchors and hashes. */
    id: string;

    /** Logical identifier used to group split slides in the timeline. */
    slideId?: string;

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
