/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import RichText from "@/components/RichText";


/** Renders an array of translated paragraphs. */
export default function Paragraphs(props: ParagraphsProps) {
    const { t } = useTranslation();
    const paragraphs = props.paragraphs ?? (
        props.i18nKey !== undefined
            ? t(props.i18nKey, { returnObjects: true })
            : []
    );

    if (!isStringArray(paragraphs)) {
        return null;
    }

    return <>
        {paragraphs.filter(isRenderableParagraph).map((paragraph) => (
            <p key={paragraph}>
                <RichText values={props.values} components={props.components}>{paragraph}</RichText>
            </p>
        ))}
    </>;
}

export function splitParagraphsAtSlideBreaks(
    paragraphs: string[],
    strategy: SlideSplitStrategy,
) {
    const chunks: ParagraphChunk[] = [{ paragraphs: [] }];

    for (const paragraph of paragraphs) {
        const slideBreak = getParagraphSlideBreak(paragraph);

        if (slideBreak !== undefined && shouldSplitAtSlideBreak(slideBreak, strategy)) {
            chunks.push({ paragraphs: [] });
            continue;
        }

        if (slideBreak !== undefined) {
            continue;
        }

        chunks.at(-1)?.paragraphs.push(paragraph);
    }

    return chunks.filter((chunk) => chunk.paragraphs.length > 0);
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isRenderableParagraph(paragraph: string) {
    return getParagraphSlideBreak(paragraph) === undefined;
}

export function getParagraphSlideBreak(paragraph: string) {
    const match = paragraph.trim().match(/^<slide-break(?<attributes>[^>]*)\/>$/);

    if (match === null) {
        return undefined;
    }

    const attributes = match.groups?.attributes ?? "";

    return {
        screenSize: getSlideSplitStrategy(getAttribute(attributes, "screen-size")),
    };
}

function getAttribute(attributes: string, name: string) {
    return attributes.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1];
}

function shouldSplitAtSlideBreak(slideBreak: ParagraphSlideBreak, strategy: SlideSplitStrategy) {
    return getSlideSplitRank(slideBreak.screenSize) <= getSlideSplitRank(strategy);
}

function getSlideSplitStrategy(value: string | undefined): SlideSplitStrategy {
    if (value === "small" || value === "medium" || value === "large") {
        return value;
    }

    return "large";
}

function getSlideSplitRank(strategy: SlideSplitStrategy) {
    return slideSplitRanks[strategy];
}

export interface ParagraphSlideBreak {
    /** Smallest strategy at which the slide should split. */
    screenSize: SlideSplitStrategy;
}

export type SlideSplitStrategy = "large" | "medium" | "small";

const slideSplitRanks = {
    large: 1,
    medium: 2,
    small: 3,
} satisfies Record<SlideSplitStrategy, number>;

export interface ParagraphChunk {
    /** Paragraphs that belong to this chunk. */
    paragraphs: string[];
}

export interface ParagraphsProps {
    /** Translation key resolving to a string array. */
    i18nKey?: string;

    /** Already-resolved paragraphs to render. */
    paragraphs?: string[];

    /** Named inline components allowed inside each paragraph. */
    components?: Record<string, ReactNode>;

    /** Interpolation values. */
    values?: Record<string, unknown>;
}
