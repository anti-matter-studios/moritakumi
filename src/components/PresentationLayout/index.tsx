/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import Navbar from "@/components/Navbar";
import PresentationDeck, { type PresentationDeckProps } from "./PresentationDeck";
import PresentationTimeline, { type PresentationTimelineProps } from "./PresentationTimeline";
import styles from "./index.module.scss";


export { PresentationDeck, PresentationTimeline };
export type { PresentationDeckProps, PresentationTimelineProps };

/** Container used to render the presentation of the page. */
export default function PresentationLayout({ children }: PresentationLayoutProps) {
    return <div className={styles.layout}>
        <Navbar />
        {children}
    </div>;
}

type PresentationLayoutProps = PropsWithChildren;
