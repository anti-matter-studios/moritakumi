/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import classNames from "classnames";

import mapStyles from "./BackgroundMap.module.scss";
import styles from "./index.module.scss";


/** OpenStreetMap export rendered with a presentation pin overlay. */
export default function BackgroundMap(props: BackgroundMapProps) {
    return <>
        <img
            alt=""
            className={classNames(styles.media, styles.unblurred)}
            height={props.height}
            src={props.map.imageSrc}
            width={props.width}
        />
        <span aria-label={props.map.title} className={mapStyles.pin} role="img" />
        <span className={mapStyles.attribution}>© OpenStreetMap contributors</span>
    </>;
}

export interface BackgroundMapProps {
    /** OpenStreetMap location rendered behind the slide content. */
    map: BackgroundMapLocation;

    /** Width of the rendered map. */
    width?: number;

    /** Height of the rendered map. */
    height?: number;
}

export interface BackgroundMapLocation {
    /** Accessible pin label. */
    title: string;

    /** Locally cached map image, served from public/. */
    imageSrc: string;

    /** Marker latitude. */
    latitude: number;

    /** Marker longitude. */
    longitude: number;

    /** Slippy-map tile zoom used when regenerating the cached PNG. */
    zoom?: number;
}
