/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useState } from "react";

interface UseTextReplacementTriggerOptions {
    showOriginal: () => void;
    showReplacement: () => void;
}

/** Tracks pointer and keyboard focus that should reveal replacement text. */
export function useTextReplacementTrigger(options: UseTextReplacementTriggerOptions) {
    const { showOriginal, showReplacement } = options;
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (isHovered || isFocused) {
            showReplacement();
            return;
        }

        showOriginal();
    }, [isFocused, isHovered, showOriginal, showReplacement]);

    return {
        onBlur: () => { setIsFocused(false); },
        onClick: () => { setIsFocused(true); },
        onFocus: () => { setIsFocused(true); },
        onMouseEnter: () => { setIsHovered(true); },
        onMouseLeave: () => { setIsHovered(false); },
    };
}
