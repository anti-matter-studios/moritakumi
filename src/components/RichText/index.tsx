/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { ReactNode } from "react";
import { Trans } from "react-i18next";

import TextReplacement from "@/components/TextReplacement";


/** Renders translated rich text with a controlled set of inline tags. */
export default function RichText(props: RichTextProps) {
    return <Trans
        i18nKey={props.i18nKey}
        values={props.values}
        components={{
            br: <br />,
            b: <b />,
            i: <i />,
            span: <span />,
            blue: <b style={{ color: "#0000FF" }} />,
            replace: <TextReplacement />,
            ...props.components,
        }}
    >
        {props.children}
    </Trans>;
}

export interface RichTextProps {
    /** Translation key to render. */
    i18nKey?: string;

    /** Fallback text or already translated text with inline tags. */
    children?: ReactNode;

    /** Named inline components allowed for this text instance. */
    components?: Record<string, ReactNode>;

    /** Interpolation values. */
    values?: Record<string, unknown>;
}
