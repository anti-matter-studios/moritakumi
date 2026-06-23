/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import styles from "./SlideHeader.module.scss";


/** Header rendered as the main title block of a slide. */
export default function SlideHeader(props: SlideHeaderProps) {
    return <header className={styles.header}>
        {props.eyebrow && <p className={styles.eyebrow}>{props.eyebrow}</p>}
        <h1 className={styles.title}>{props.children}</h1>
    </header>;
}

export interface SlideHeaderProps extends PropsWithChildren {
    /** Small contextual label rendered above the title. */
    eyebrow?: string;
}
