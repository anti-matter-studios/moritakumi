/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren, ReactNode } from "react";
import { Trans } from "react-i18next";

import LoveNote from "@/components/LoveNote";
import TraitSlider from "@/components/TraitSlider";
import TextReplacement from "@/components/TextReplacement";
import Tooltip from "@/components/Tooltip";
import styles from "./index.module.scss";
import { SlideCard, SlideCardList } from "../Slide";


/** Renders translated rich text with a controlled set of inline tags. */
export default function RichText(props: RichTextProps) {
    return <Trans
        i18nKey={props.i18nKey}
        values={props.values}
        components={{
            br: <br />,
            b: <b />,
            i: <i />,
            u: <u />,
            span: <span />,
            small: <small />,
            h1: <h1 />,
            h2: <h2 />,
            h3: <h3 />,
            h4: <h4 />,
            h5: <h5 />,
            h6: <h6 />,
            blue: <BlueText />,
            love: <LoveNote />,
            replace: <TextReplacement />,
            tooltip: <Tooltip />,
            card: <SlideCard />,
            "card-list": <SlideCardList />,
            "trait-slider": <TraitSlider />,
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

function BlueText(props: BlueTextProps) {
    const className = [
        isEnabled(props.light) && styles.blueLight,
        isEnabled(props.dark) && styles.blueDark,
        isEnabled(props.gradient) && styles.blueGradient,
    ].filter(Boolean).join(" ");

    return <span className={className}>{props.children}</span>;
}

function isEnabled(value: unknown) {
    return value !== undefined && value !== null && value !== false && value !== "false";
}

interface BlueTextProps extends PropsWithChildren {
    /** Use the light blue presentation color. */
    light?: boolean | string;

    /** Use the dark blue presentation color. */
    dark?: boolean | string;

    /** Render the text as a dark-to-light blue gradient. */
    gradient?: boolean | string;
}
