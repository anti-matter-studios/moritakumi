/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import styles from "./PresentationDeck.module.scss";


/** Main region that contains the presentation slides. */
export default function PresentationDeck({ children }: PresentationDeckProps) {
    return <main className={styles.deck} id="presentation">
        {children}
    </main>;
}

export type PresentationDeckProps = PropsWithChildren;
