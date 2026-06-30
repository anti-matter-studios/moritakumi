/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import classNames from "classnames";
import type { PropsWithChildren } from "react";

import styles from "./index.module.scss";

/** Grid used to group reusable slide cards. */
export default function SlideCardList({ children, tight, small }: SlideCardGridProps) {
    const className = classNames(styles.cardList, { tight: tight, small: small });
    return <div className={className}>{children}</div>;
}

interface SlideCardGridProps extends PropsWithChildren {
    tight?: boolean;
    small?: boolean;
}
