/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { CSSProperties } from "react";

import styles from "./index.module.scss";


const variants = ["blue", "yellow", "green", "purple", "red"] as const;

/** Read-only slider for displaying a value between two translated labels. */
export default function TraitSlider(props: TraitSliderProps) {
    if (typeof props.lhs !== "string" || typeof props.rhs !== "string") {
        return null;
    }

    const value = clamp(parseValue(props.value), 0, 100);
    const leftPercentage = 100 - value;
    const rightPercentage = value;
    const isLeftActive = leftPercentage >= rightPercentage;
    const activeValue = Math.max(leftPercentage, rightPercentage);
    const activeLabel = isLeftActive ? props.lhs : props.rhs;
    const activePercentage = formatPercentage(activeValue);
    const summary = `${activePercentage}% ${activeLabel}`;
    const style = {
        "--trait-slider-value": `${value.toString()}%`,
    } as CSSProperties;

    return <span
        className={styles.slider}
        data-variant={normalizeVariant(props.variant)}
        style={style}
    >
        <span className={styles.summary}>
            <span className={styles.summaryValue}>{activePercentage}%</span>
            <span className={styles.summaryLabel}>{activeLabel}</span>
        </span>
        <span
            className={styles.track}
            role="meter"
            aria-label={`${props.lhs} / ${props.rhs}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-valuetext={summary}
        >
            <span className={styles.thumb} aria-hidden="true" />
        </span>
        <span className={styles.labels} aria-hidden="true">
            <span data-active={isLeftActive ? "true" : undefined}>{props.lhs}</span>
            <span data-active={!isLeftActive ? "true" : undefined}>{props.rhs}</span>
        </span>
    </span>;
}

function parseValue(value: TraitSliderProps["value"]) {
    if (typeof value === "number") {
        return value;
    }

    if (typeof value === "string") {
        return Number.parseFloat(value);
    }

    return 0;
}

function normalizeVariant(value: TraitSliderProps["variant"]): TraitSliderVariant {
    return variants.includes(value as TraitSliderVariant)
        ? value as TraitSliderVariant
        : "blue";
}

function clamp(value: number, minimum: number, maximum: number) {
    if (!Number.isFinite(value)) {
        return minimum;
    }

    return Math.min(Math.max(value, minimum), maximum);
}

function formatPercentage(value: number) {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

export interface TraitSliderProps {
    /** Left-hand side label. Value 0 means 100% of this label. */
    lhs?: string;

    /** Right-hand side label. Value 100 means 100% of this label. */
    rhs?: string;

    /** Read-only slider value from 0 to 100. */
    value?: number | string;

    /** Visual colour variant. */
    variant?: TraitSliderVariant;
}

type TraitSliderVariant = (typeof variants)[number];
