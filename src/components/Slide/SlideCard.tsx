/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";
import styles from "./SlideCard.module.scss";


export default function SlideCard(props: SlideCardProps) {
    return (
        <article className={styles.card}>
            {props.title && <h2>{props.title}</h2>}
            {props.children}
            {props.footer && <footer>{props.footer}</footer>}
        </article>
    );
}

export interface SlideCardProps extends PropsWithChildren {
    title?: string;
    footer?: string;
}