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
    const paragraphs = t(props.i18nKey, { returnObjects: true });

    if (!isStringArray(paragraphs)) {
        return null;
    }

    return <>
        {paragraphs.map((paragraph) => (
            <p key={paragraph}>
                <RichText components={props.components}>{paragraph}</RichText>
            </p>
        ))}
    </>;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export interface ParagraphsProps {
    /** Translation key resolving to a string array. */
    i18nKey: string;

    /** Named inline components allowed inside each paragraph. */
    components?: Record<string, ReactNode>;
}
