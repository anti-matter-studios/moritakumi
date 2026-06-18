/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import styles from "./index.module.scss";

export default function BackgroundImage(props: BackgroundImageProps) {
    return (
        <figure
            className={styles.background}
            data-placement={props.placement ?? "right"}
            data-shape={props.shape ?? "rounded"}
        >
            <img alt={props.alt ?? ""} src={props.src} />
        </figure>
    );
}

export interface BackgroundImageProps {
    /** Image source rendered behind the slide content. */
    src: string;

    /** Accessible image description. Leave empty or omit for decorative images. */
    alt?: string;

    /** Side of the slide where the floating image should sit. */
    placement?: "left" | "right" | "center";

    /** Visual frame shape. */
    shape?: "rounded" | "circle" | "soft";

}
