/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { TraitSliderProps, TraitSliderVariant } from ".";

export const traitSliderVariants = ["blue", "yellow", "green", "purple", "red"] as const;
export const centerValue = 50;

export function getTraitSliderState(props: TraitSliderProps, displayValue: number) {
    const lhs = typeof props.lhs === "string" ? props.lhs : "";
    const rhs = typeof props.rhs === "string" ? props.rhs : "";
    const leftPercentage = 100 - displayValue;
    const rightPercentage = displayValue;
    const isLeftActive = leftPercentage >= rightPercentage;
    const activeValue = Math.max(leftPercentage, rightPercentage);
    const activeLabel = isLeftActive ? lhs : rhs;
    const activePercentage = formatPercentage(activeValue);

    return {
        activeLabel,
        activePercentage,
        hasLabels: lhs.length > 0 && rhs.length > 0,
        isLeftActive,
        lhs,
        rhs,
        summary: `${activePercentage}% ${activeLabel}`,
        value: clamp(parseValue(props.value), 0, 100),
        variant: normalizeVariant(props.variant),
    };
}

export function clamp(value: number, minimum: number, maximum: number) {
    if (!Number.isFinite(value)) {
        return minimum;
    }

    return Math.min(Math.max(value, minimum), maximum);
}

function parseValue(value: TraitSliderProps["value"]) {
    if (typeof value === "number") {
        return value;
    }

    return typeof value === "string" ? Number.parseFloat(value) : 0;
}

function normalizeVariant(value: TraitSliderProps["variant"]): TraitSliderVariant {
    return traitSliderVariants.includes(value as TraitSliderVariant)
        ? value as TraitSliderVariant
        : "blue";
}

function formatPercentage(value: number) {
    return Math.round(value).toString();
}
