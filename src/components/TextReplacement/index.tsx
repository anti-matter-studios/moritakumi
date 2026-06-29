/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useState, type ReactNode } from "react";

import { useTextReplacement, type TextReplacementSpeed } from "./useTextReplacement";
import styles from "./index.module.scss";


/** Interactive inline text that shuffles from one label to another. */
export default function TextReplacement(props: TextReplacementProps) {
    const originalText = props.text ?? reactNodeToText(props.children);
    const replacementText = props.replacement ?? originalText;
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const { displayText, showOriginal, showReplacement } = useTextReplacement({
        replacement: replacementText,
        replacementFrameMs: props.replacementFrameMs,
        revealStepCount: props.revealStepCount,
        shuffleFrameCount: props.shuffleFrameCount,
        shuffleFrameMs: props.shuffleFrameMs,
        speed: props.speed,
        characterSet: props.characterSet,
        text: originalText,
    });

    useEffect(() => {
        if (isHovered || isFocused) {
            showReplacement();
        } else {
            showOriginal();
        }
    }, [isFocused, isHovered, showOriginal, showReplacement]);

    return <span
        aria-label={`${originalText} / ${replacementText}`}
        className={styles.text}
        onBlur={() => setIsFocused(false)}
        onClick={() => setIsFocused(true)}
        onFocus={() => setIsFocused(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
    >
        {displayText}
    </span>;
}

function reactNodeToText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(reactNodeToText).join("");
    }

    return "";
}

export interface TextReplacementProps {
    /** Text displayed before interaction. When omitted, the component children are used. */
    text?: string;

    /** Text progressively revealed during interaction. */
    replacement?: string;

    /** Preset or numeric multiplier for the animation speed. */
    speed?: TextReplacementSpeed;

    /** Number of pre-reveal shuffle frames. */
    shuffleFrameCount?: number | string;

    /** Delay between shuffle frames. */
    shuffleFrameMs?: number | string;

    /** Delay between reveal frames. */
    replacementFrameMs?: number | string;

    /** Number of characters revealed on each replacement frame. */
    revealStepCount?: number | string;

    /** Fallback original text when `text` is omitted. */
    children?: ReactNode;
    characterSet: "full" | "reduced";
}
