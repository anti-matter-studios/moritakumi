/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useRef, type CSSProperties } from "react";

import styles from "./index.module.scss";
import { getTraitSliderState, traitSliderVariants } from "./traitSliderValue";
import { useTraitSliderAnimation } from "./useTraitSliderAnimation";


/** Read-only slider for displaying a value between two translated labels. */
export default function TraitSlider(props: TraitSliderProps) {
    const sliderRef = useRef<HTMLSpanElement>(null);
    const measuredState = getTraitSliderState(props, 50);
    const displayValue = useTraitSliderAnimation(
        sliderRef,
        measuredState.value,
        measuredState.hasLabels,
    );
    const state = getTraitSliderState(props, displayValue);
    const style = {
        "--trait-slider-value": `${displayValue.toString()}%`,
    } as CSSProperties;

    if (!state.hasLabels) {
        return null;
    }

    return <span
        ref={sliderRef}
        className={styles.slider}
        data-variant={state.variant}
        style={style}
    >
        <span className={styles.summary}>
            <span className={styles.summaryValue}>{state.activePercentage}%</span>
            <span className={styles.summaryLabel}>{state.activeLabel}</span>
        </span>
        <span
            className={styles.track}
            role="meter"
            aria-label={`${state.lhs} / ${state.rhs}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(displayValue)}
            aria-valuetext={state.summary}
        >
            <span className={styles.thumb} aria-hidden="true" />
        </span>
        <span className={styles.labels} aria-hidden="true">
            <span data-active={state.isLeftActive ? "true" : undefined}>{state.lhs}</span>
            <span data-active={!state.isLeftActive ? "true" : undefined}>{state.rhs}</span>
        </span>
    </span>;
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

export type TraitSliderVariant = (typeof traitSliderVariants)[number];
