/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { Trans } from "react-i18next";
import type { ReactNode } from "react";

interface TransTextProps {
    /** The translation key or the text content containing tags. */
    i18nKey?: string;
    /** The text content containing tags if i18nKey is not used. */
    children?: ReactNode;
    /** Optional components mapping for the Trans component. */
    components?: Record<string, ReactNode>;
    /** Optional values for interpolation. */
    values?: Record<string, unknown>;
}

/**
 * Enhanced Trans component with pre-defined common tags.
 * Allows using <br/>, <b>, <i>, and <blue> in translations.
 */
export default function TransText({ i18nKey, children, components, values }: TransTextProps) {
    return <Trans
        i18nKey={i18nKey}
        values={values}
        components={{
            br: <br />,
            b: <b />,
            i: <i />,
            span: <span />,
            blue: <b style={{ color: "#0000FF" }} />,
            ...components,
        }}
    >
        {children}
    </Trans>;
}
