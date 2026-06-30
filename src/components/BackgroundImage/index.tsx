/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import classNames from "classnames";
import type { CSSProperties } from "react";

import BackgroundMap, { type BackgroundMapLocation } from "./BackgroundMap";
import styles from "./index.module.scss";
import useContentImageSource from "./useContentImageSource";


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
        data-kind={"map" in props ? "map" : "image"}
        data-placement={props.placement ?? "top-right"}
        data-shape={props.shape ?? "rounded"}
        style={style}
    >
        {"map" in props
            ? <BackgroundMap height={props.height} map={props.map} width={props.width} />
            : <BackgroundPhoto {...props} />
        }
    </figure>;
}

function BackgroundPhoto(props: BackgroundPhotoProps) {
    const imageSource = useContentImageSource(props.src);

    return imageSource
        ? <img
            alt={props.alt ?? ""}
            className={styles.media}
            height={props.height}
            src={imageSource}
            width={props.width}
        />
        : <span className={classNames(styles.media, styles.placeholder)} data-content-image-placeholder="true" />;
}

interface BackgroundBaseProps {
    /** Width of the background visual. */
    width?: number;

    /** Height of the background visual. */
    height?: number;

    /** Side of the slide where the floating visual should sit. */
    placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

    /** Visual frame shape. */
    shape?: "rounded" | "circle" | "soft";
}

interface BackgroundPhotoProps extends BackgroundBaseProps {
    /** Image source rendered behind the slide content. */
    src: string;

    /** Accessible image description. Leave empty or omit for decorative images. */
    alt?: string;
}

interface BackgroundMapImageProps extends BackgroundBaseProps {
    /** OpenStreetMap location rendered behind the slide content. */
    map: BackgroundMapLocation;
}

export type BackgroundImageProps = BackgroundPhotoProps | BackgroundMapImageProps;

type BackgroundImageStyle = CSSProperties & {
    "--background-image-aspect-ratio"?: string;
    "--background-image-source-width"?: string;
};
