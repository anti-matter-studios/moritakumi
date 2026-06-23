/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren, ReactNode } from "react";

import styles from "./SlideCard.module.scss";


/** Framed content block for quotes, callouts, and compact slide details. */
export default function SlideCard(props: SlideCardProps) {
    return <article className={styles.card}>
        {props.title && <h2>{props.title}</h2>}
        {props.children && <div className={styles.body}>
            {props.children}
        </div>}
        {props.footer && <footer>{props.footer}</footer>}
    </article>;
}

export interface SlideCardProps extends PropsWithChildren {
    /** Optional card heading. */
    title?: ReactNode;

    /** Optional attribution or supporting note. */
    footer?: ReactNode;
}
