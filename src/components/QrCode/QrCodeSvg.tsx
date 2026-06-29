/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { QrCodeContents } from "./useQrCodeContents";
import styles from "./index.module.scss";


/** SVG renderer for an already-generated QR code matrix. */
export default function QrCodeSvg({ contents }: QrCodeSvgProps) {
    return <svg
        className={styles.code}
        viewBox={`0 0 ${contents.size.toString()} ${contents.size.toString()}`}
        role="img"
        aria-hidden="true"
    >
        <rect
            className={styles.background}
            width={contents.size}
            height={contents.size}
            rx="3.5"
        />
        {contents.matrix.map((row, rowIndex) => row.map((isDark, columnIndex) => {
            if (!isDark) {
                return null;
            }

            const x = columnIndex + contents.quietZone;
            const y = rowIndex + contents.quietZone;
            const isFinder = isFinderModule(rowIndex, columnIndex, contents.matrix.length);

            return <rect
                key={`${rowIndex.toString()}-${columnIndex.toString()}`}
                className={isFinder ? styles.finderModule : styles.module}
                x={x + 0.08}
                y={y + 0.08}
                width="0.84"
                height="0.84"
                rx={isFinder ? 0.18 : 0.34}
            />;
        }))}
    </svg>;
}

function isFinderModule(row: number, column: number, moduleCount: number) {
    const inTop = row < 7;
    const inBottom = row >= moduleCount - 7;
    const inLeft = column < 7;
    const inRight = column >= moduleCount - 7;

    return (inTop && inLeft) || (inTop && inRight) || (inBottom && inLeft);
}

interface QrCodeSvgProps {
    /** Matrix and sizing data generated from the encoded value. */
    contents: QrCodeContents;
}
