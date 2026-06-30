/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useId, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import type { Placement } from "@popperjs/core";

import styles from "./index.module.scss";
import { useTooltip } from "./useTooltip";


/** Inline translated term that reveals a Popper-positioned tooltip. */
export default function Tooltip(props: TooltipProps) {
    const id = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const tooltipText = props.text?.trim();
    const tooltip = useTooltip({ placement: props.placement, tooltipRef, triggerRef });

    if (tooltipText === undefined || tooltipText.length === 0) {
        return <>{props.children}</>;
    }

    return <>
        <button
            ref={triggerRef}
            type="button"
            aria-describedby={tooltip.isOpen ? id : undefined}
            aria-expanded={tooltip.isOpen}
            className={styles.trigger}
            {...tooltip.triggerEvents}
        >
            {props.children}
        </button>
        {tooltip.isOpen && createPortal(
            <span
                ref={tooltipRef}
                id={id}
                className={styles.tooltip}
                role="tooltip"
            >
                {tooltipText}
                <span className={styles.arrow} data-popper-arrow />
            </span>,
            document.body,
        )}
    </>;
}

export interface TooltipProps extends PropsWithChildren {
    /** Tooltip body text, provided from translation attributes. */
    text?: string;

    /** Preferred Popper placement. */
    placement?: Placement;
}
