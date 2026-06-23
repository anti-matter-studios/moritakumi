/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import BackgroundImage, {
    type BackgroundImageProps
} from "@/components/BackgroundImage";
import SlideCard, { type SlideCardProps } from "./SlideCard";
import SlideHeader, { type SlideHeaderProps } from "./SlideHeader";
import styles from "./index.module.scss";


export { SlideCard, SlideHeader };
export type { SlideCardProps, SlideHeaderProps };

/** Full-screen presentation slide. */
export default function Slide(props: SlideProps) {
    return <section
        className={styles.slide}
        data-tone={props.tone ?? "default"}
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
    tone?: "default" | "soft" | "strong" | "plain";

    /** Image to render in the background. */
    backgroundImage?: BackgroundImageProps;
}

type SlideCardGridProps = PropsWithChildren;
