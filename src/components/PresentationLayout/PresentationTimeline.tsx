/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import styles from "./PresentationTimeline.module.scss";


/** Fixed region used to place the presentation timeline beside the slides. */
export default function PresentationTimeline({ children }: PresentationTimelineProps) {
    return <aside className={styles.timeline} aria-label="Presentation timeline">
        {children}
    </aside>;
}

export type PresentationTimelineProps = PropsWithChildren;
