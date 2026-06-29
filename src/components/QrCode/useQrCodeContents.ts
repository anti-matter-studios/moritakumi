/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useMemo } from "react";
import qrcode from "qrcode-generator";


const quietZone = 4;

/** Generates the renderable QR code contents for a value. */
export default function useQrCodeContents(value: string): QrCodeContents {
    return useMemo(() => {
        const matrix = createQrMatrix(value);

        return {
            matrix,
            quietZone,
            size: matrix.length + quietZone * 2,
        };
    }, [value]);
}

function createQrMatrix(value: string) {
    const qr = qrcode(0, "M");

    qr.addData(value);
    qr.make();

    return Array.from({ length: qr.getModuleCount() }, (_, row) => (
        Array.from({ length: qr.getModuleCount() }, (_, column) => qr.isDark(row, column))
    ));
}

export interface QrCodeContents {
    /** Boolean matrix where dark modules are true. */
    matrix: boolean[][];

    /** Blank module count around the generated QR matrix. */
    quietZone: number;

    /** Total SVG viewBox size including the quiet zone. */
    size: number;
}
