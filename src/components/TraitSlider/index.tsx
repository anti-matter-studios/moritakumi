/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";

import styles from "./index.module.scss";


const variants = ["blue", "yellow", "green", "purple", "red"] as const;
const centerValue = 50;
const animationDurationMs = 1_600;

/** Read-only slider for displaying a value between two translated labels. */
export default function TraitSlider(props: TraitSliderProps) {
    const sliderRef = useRef<HTMLSpanElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const isVisibleRef = useRef(false);
    const [displayValue, setDisplayValue] = useState(centerValue);
    const lhs = typeof props.lhs === "string" ? props.lhs : "";
    const rhs = typeof props.rhs === "string" ? props.rhs : "";
    const hasLabels = typeof props.lhs === "string" && typeof props.rhs === "string";
    const value = clamp(parseValue(props.value), 0, 100);
    const leftPercentage = 100 - displayValue;
    const rightPercentage = displayValue;
    const isLeftActive = leftPercentage >= rightPercentage;
    const activeValue = Math.max(leftPercentage, rightPercentage);
    const activeLabel = isLeftActive ? lhs : rhs;
    const activePercentage = formatPercentage(activeValue);
    const summary = `${activePercentage}% ${activeLabel}`;
    const style = {
        "--trait-slider-value": `${displayValue.toString()}%`,
    } as CSSProperties;

    useEffect(() => {
        const slider = sliderRef.current;

        if (!hasLabels || slider === null) {
            return;
        }

        const cancelAnimation = () => {
            if (animationFrameRef.current !== undefined) {
                window.cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = undefined;
            }
        };

        const animateToValue = () => {
            cancelAnimation();

            if (prefersReducedMotion()) {
                setDisplayValue(value);
                return;
            }

            let startedAt: number | undefined;
            setDisplayValue(centerValue);

            const update = (timestamp: number) => {
                startedAt ??= timestamp;

                const progress = clamp((timestamp - startedAt) / animationDurationMs, 0, 1);
                const easedProgress = easeOutCubic(progress);
                const nextValue = centerValue + ((value - centerValue) * easedProgress);

                setDisplayValue(progress === 1 ? value : nextValue);

                if (progress < 1) {
                    animationFrameRef.current = window.requestAnimationFrame(update);
                }
            };

            animationFrameRef.current = window.requestAnimationFrame(update);
        };

        if (!("IntersectionObserver" in window)) {
            animateToValue();
            return cancelAnimation;
        }

        const deck = document.getElementById("presentation");
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries.find((observedEntry) => observedEntry.target === slider);

                if (entry === undefined) {
                    return;
                }

                if (entry.isIntersecting) {
                    if (isVisibleRef.current) {
                        return;
                    }

                    isVisibleRef.current = true;
                    animateToValue();
                    return;
                }

                isVisibleRef.current = false;
                cancelAnimation();
                setDisplayValue(centerValue);
            },
            {
                root: deck,
                threshold: 0.35,
            },
        );

        observer.observe(slider);

        return () => {
            isVisibleRef.current = false;
            observer.disconnect();
            cancelAnimation();
        };
    }, [hasLabels, value]);

    if (!hasLabels) {
        return null;
    }

    return <span
        ref={sliderRef}
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
            aria-label={`${lhs} / ${rhs}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(displayValue)}
            aria-valuetext={summary}
        >
            <span className={styles.thumb} aria-hidden="true" />
        </span>
        <span className={styles.labels} aria-hidden="true">
            <span data-active={isLeftActive ? "true" : undefined}>{lhs}</span>
            <span data-active={!isLeftActive ? "true" : undefined}>{rhs}</span>
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

function easeOutCubic(value: number) {
    return 1 - ((1 - value) ** 3);
}

function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

function formatPercentage(value: number) {
    return Math.round(value).toString();
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
