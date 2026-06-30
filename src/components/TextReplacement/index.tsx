/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { ReactNode } from "react";

import { useTextReplacement, type TextReplacementSpeed } from "./useTextReplacement";
import { useTextReplacementTrigger } from "./useTextReplacementTrigger";
import styles from "./index.module.scss";


/** Interactive inline text that shuffles from one label to another. */
export default function TextReplacement(props: TextReplacementProps) {
    const originalText = props.text ?? reactNodeToText(props.children);
    const replacementText = props.replacement ?? originalText;
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
    const triggerEvents = useTextReplacementTrigger({ showOriginal, showReplacement });

    return <span
        aria-label={`${originalText} / ${replacementText}`}
        className={styles.text}
        {...triggerEvents}
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
    characterSet?: "full" | "reduced";
}
