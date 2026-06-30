/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import styles from "./index.module.scss";

/** Entry in the presentation timeline. */
export default function TimelineItem(props: TimelineItemProps) {
    return <a
        className={styles.link}
        data-active={props.isActive}
        href={`#${props.id}`}
        aria-current={props.isActive ? "step" : undefined}
    >
        <span className={styles.marker}>
            <span>{(props.index ?? 0) + 1}</span>
        </span>
        <span className={styles.label}>{props.children}</span>
    </a>;
}

export interface TimelineItemProps extends PropsWithChildren {
    /** Unique identifier of the target slide. */
    id: string;

    /** Index injected by the timeline parent. */
    index?: number;

    /** Flag injected by the timeline parent when this item is current. */
    isActive?: boolean;
}
