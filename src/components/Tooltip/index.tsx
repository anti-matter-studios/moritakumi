/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    useEffect,
    useId,
    useRef,
    useState,
    type KeyboardEvent,
    type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import { createPopper, type Instance, type Placement } from "@popperjs/core";

import styles from "./index.module.scss";


/** Inline translated term that reveals a Popper-positioned tooltip. */
export default function Tooltip(props: TooltipProps) {
    const id = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const popperRef = useRef<Instance | undefined>(undefined);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const isOpen = isHovered || isFocused || isPinned;
    const tooltipText = props.text?.trim();

    useEffect(() => {
        if (!isOpen || triggerRef.current === null || tooltipRef.current === null) {
            return;
        }

        popperRef.current = createPopper(triggerRef.current, tooltipRef.current, {
            placement: normalizePlacement(props.placement),
            modifiers: [
                { name: "offset", options: { offset: [0, 10] } },
                { name: "flip", options: { padding: 12 } },
                { name: "preventOverflow", options: { padding: 12 } },
            ],
        });

        return () => {
            popperRef.current?.destroy();
            popperRef.current = undefined;
        };
    }, [isOpen, props.placement]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Node)) {
                return;
            }

            if (
                triggerRef.current?.contains(target) === true ||
                tooltipRef.current?.contains(target) === true
            ) {
                return;
            }

            setIsPinned(false);
            setIsFocused(false);
        };

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsPinned(false);
                setIsFocused(false);
                triggerRef.current?.blur();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    if (tooltipText === undefined || tooltipText.length === 0) {
        return <>{props.children}</>;
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();
        setIsPinned((current) => !current);
    };

    return <>
        <button
            ref={triggerRef}
            type="button"
            aria-describedby={isOpen ? id : undefined}
            aria-expanded={isOpen}
            className={styles.trigger}
            onBlur={() => { setIsFocused(false); }}
            onClick={() => { setIsPinned((current) => !current); }}
            onFocus={() => { setIsFocused(true); }}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => { setIsHovered(true); }}
            onMouseLeave={() => { setIsHovered(false); }}
        >
            {props.children}
        </button>
        {isOpen && createPortal(
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

function normalizePlacement(value: TooltipProps["placement"]): Placement {
    return placements.includes(value as Placement) ? value as Placement : "top";
}

const placements = [
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "right",
    "right-start",
    "right-end",
    "left",
    "left-start",
    "left-end",
] satisfies Placement[];

export interface TooltipProps extends PropsWithChildren {
    /** Tooltip body text, provided from translation attributes. */
    text?: string;

    /** Preferred Popper placement. */
    placement?: Placement;
}
