/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTextReplacement } from "./useTextReplacement";
import styles from "./index.module.scss";

export default function TextReplacement(props: TextReplacementProps) {
    const { displayText, showOriginal, showReplacement } = useTextReplacement({
        replacement: props.replacement,
        text: props.text,
    });

    return (
        <span
            aria-label={`${props.text} / ${props.replacement}`}
            className={styles.text}
            onBlur={showOriginal}
            onFocus={showReplacement}
            onMouseEnter={showReplacement}
            onMouseLeave={showOriginal}
            tabIndex={0}
        >
            {displayText}
        </span>
    );
}

export interface TextReplacementProps {
    /** Text displayed before interaction. */
    text: string;

    /** Text progressively revealed after the shuffle. */
    replacement: string;
}
