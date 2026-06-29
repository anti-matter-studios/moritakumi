/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { forwardRef, type PropsWithChildren } from "react";
import classNames from "classnames";

import QrCodeSvg from "./QrCodeSvg";
import useQrCodeContents from "./useQrCodeContents";
import styles from "./index.module.scss";


/** Dynamic QR code rendered as a themed SVG. */
const QrCode = forwardRef<HTMLAnchorElement, QrCodeProps>(function QrCode(props, ref) {
    const contents = useQrCodeContents(props.value);

    return <a
        ref={ref}
        className={classNames(styles.card, props.className)}
        href={props.value}
        aria-label={props.label}
    >
        <QrCodeSvg contents={contents} />
        <span className={styles.label}>{props.children}</span>
    </a>;
});

export default QrCode;

export interface QrCodeProps extends PropsWithChildren {
    /** URL or text encoded in the QR code. */
    value: string;

    /** Accessible label describing the link target. */
    label: string;

    /** Optional external class name. */
    className?: string;
}
