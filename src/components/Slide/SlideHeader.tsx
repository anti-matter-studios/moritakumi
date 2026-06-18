/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren, ReactElement } from "react";

import styles from "./SlideHeader.module.scss";


export default function SlideHeader(props: SlideHeaderProps) {
    let eyebrow: ReactElement|null = null;
    if (props.eyebrow) {
        eyebrow = <p className={styles.eyebrow}>{props.eyebrow}</p>;
    }

    return <header className={styles.header}>
        {eyebrow}
        <h1 className={styles.title}>{props.children}</h1>
    </header>;
}

export interface SlideHeaderProps extends PropsWithChildren {
    /** Eyebrow element rendered above the title text. */
    eyebrow?: string;
}
