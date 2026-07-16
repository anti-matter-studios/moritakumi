/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import Paragraphs, { splitParagraphsAtSlideBreaks } from "@/components/Paragraphs";
import { useSlideSplitStrategy } from "@/components/PresentationLayout/responsiveSlideSplitting";
import Slide, { type SlideProps } from ".";


/** A slide that honors responsive break and text-visibility markers. */
export default function ResponsiveSlide(props: ResponsiveSlideProps) {
    const { t } = useTranslation();
    const strategy = useSlideSplitStrategy();
    const translatedParagraphs = t(props.paragraphsI18nKey, { returnObjects: true });
    const paragraphs = isStringArray(translatedParagraphs) ? translatedParagraphs : [];
    const chunks = splitParagraphsAtSlideBreaks(paragraphs, strategy);
    const renderableChunks = chunks.length > 0 ? chunks : [{ paragraphs: [] }];
    const {
        header,
        leadContent,
        paragraphComponents,
        paragraphValues,
        paragraphsI18nKey: _paragraphsI18nKey,
        supportingContent,
        ...slideProps
    } = props;

    return <>
        {renderableChunks.map((chunk, index) => {
            const slideId = getSplitSlideId(props.id, index);
            const isFirstChunk = index === 0;

            return <Slide
                {...slideProps}
                id={slideId}
                key={slideId}
                slideId={props.id}
            >
                {isFirstChunk && leadContent}
                {header}
                {isFirstChunk && supportingContent}
                <Paragraphs
                    paragraphs={chunk.paragraphs}
                    components={paragraphComponents}
                    values={paragraphValues}
                />
            </Slide>;
        })}
    </>;
}

function getSplitSlideId(slideId: string, index: number) {
    return index === 0 ? slideId : `${slideId}-${(index + 1).toString()}`;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export interface ResponsiveSlideProps extends Omit<SlideProps, "children" | "slideId"> {
    /** Header repeated on every generated slide. */
    header: ReactNode;

    /** Content rendered before the header on the first generated slide only. */
    leadContent?: ReactNode;

    /** Named rich-text components available to translated paragraphs. */
    paragraphComponents?: Record<string, ReactNode>;

    /** Interpolation values available to translated paragraphs. */
    paragraphValues?: Record<string, unknown>;

    /** Translation key resolving to the paragraph array. */
    paragraphsI18nKey: string;

    /** Content rendered after the header on the first generated slide only. */
    supportingContent?: ReactNode;
}
