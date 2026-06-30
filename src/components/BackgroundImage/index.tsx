/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { CSSProperties } from "react";

import styles from "./index.module.scss";


/** Floating image rendered behind a slide's foreground content. */
export default function BackgroundImage(props: BackgroundImageProps) {
    const imageRatio = props.width && props.height
        ? props.width / props.height
        : undefined;

    const style = {
        "--background-image-aspect-ratio": imageRatio?.toString(),
        "--background-image-source-width": props.width ? `${props.width.toString()}px` : undefined,
    } as BackgroundImageStyle;

    return <figure
        className={styles.background}
        data-placement={props.placement ?? "top-right"}
        data-shape={props.shape ?? "rounded"}
        style={style}
    >
        <img alt={props.alt ?? ""} src={props.src} width={props.width} height={props.height} />
    </figure>;
}

export interface BackgroundImageProps {
    /** Image source rendered behind the slide content. */
    src: string;

    /** Width of the image. */
    width?: number;

    /** Height of the image. */
    height?: number;

    /** Accessible image description. Leave empty or omit for decorative images. */
    alt?: string;

    /** Side of the slide where the floating image should sit. */
    placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

    /** Visual frame shape. */
    shape?: "rounded" | "circle" | "soft";
}

type BackgroundImageStyle = CSSProperties & {
    "--background-image-aspect-ratio"?: string;
    "--background-image-source-width"?: string;
};
