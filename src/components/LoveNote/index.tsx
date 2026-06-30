/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import styles from "./index.module.scss";


/** Inline affectionate hover treatment for a personal note. */
export default function LoveNote(props: PropsWithChildren) {
    return <span className={styles.loveNote}>
        {props.children}
        <span className={styles.heart} aria-hidden="true">{"\u2665"}</span>
        <span className={styles.heart} aria-hidden="true">{"\u2665"}</span>
    </span>;
}
