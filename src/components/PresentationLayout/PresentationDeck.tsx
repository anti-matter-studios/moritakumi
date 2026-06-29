/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import styles from "./PresentationDeck.module.scss";
import classNames from "classnames";


/** Main region that contains the presentation slides. */
export default function PresentationDeck(props: PresentationDeckProps) {
    const className = classNames(styles.deck, { [styles.disableTimelinePadding]: props.disableTimelinePadding });
    return <main className={className} id="presentation">
        {props.children}
    </main>;
}

export interface PresentationDeckProps extends PropsWithChildren {
    /** If set, disables the left-hand side timeline padding. */
    disableTimelinePadding?: boolean;
}
