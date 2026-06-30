/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { createPopper, type Instance, type Placement } from "@popperjs/core";
import {
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
    type RefObject,
} from "react";

import { normalizePlacement } from "./tooltipPlacement";

interface UseTooltipOptions {
    placement?: Placement;
    tooltipRef: RefObject<HTMLSpanElement | null>;
    triggerRef: RefObject<HTMLButtonElement | null>;
}

/** Manages tooltip open state, keyboard handling, outside clicks, and Popper lifecycle. */
export function useTooltip(options: UseTooltipOptions) {
    const { placement, tooltipRef, triggerRef } = options;
    const popperRef = useRef<Instance | undefined>(undefined);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const isOpen = isHovered || isFocused || isPinned;

    usePopper(isOpen, triggerRef, tooltipRef, placement, popperRef);
    useTooltipDismissal(isOpen, triggerRef, tooltipRef, () => {
        setIsFocused(false);
        setIsPinned(false);
    });

    return {
        isOpen,
        triggerEvents: {
            onBlur: () => { setIsFocused(false); },
            onClick: () => { setIsPinned((current) => !current); },
            onFocus: () => { setIsFocused(true); },
            onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIsPinned((current) => !current);
                }
            },
            onMouseEnter: () => { setIsHovered(true); },
            onMouseLeave: () => { setIsHovered(false); },
        },
    };
}

function usePopper(
    isOpen: boolean,
    triggerRef: RefObject<HTMLButtonElement | null>,
    tooltipRef: RefObject<HTMLSpanElement | null>,
    placement: Placement | undefined,
    popperRef: RefObject<Instance | undefined>,
) {
    useEffect(() => {
        if (!isOpen || triggerRef.current === null || tooltipRef.current === null) {
            return;
        }

        popperRef.current = createPopper(triggerRef.current, tooltipRef.current, {
            placement: normalizePlacement(placement),
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
    }, [isOpen, placement, popperRef, tooltipRef, triggerRef]);
}

function useTooltipDismissal(
    isOpen: boolean,
    triggerRef: RefObject<HTMLButtonElement | null>,
    tooltipRef: RefObject<HTMLSpanElement | null>,
    dismiss: () => void,
) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Node) || containsTooltipNode(target, triggerRef, tooltipRef)) {
                return;
            }

            dismiss();
        };

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                dismiss();
                triggerRef.current?.blur();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dismiss, isOpen, tooltipRef, triggerRef]);
}

function containsTooltipNode(
    target: Node,
    triggerRef: RefObject<HTMLButtonElement | null>,
    tooltipRef: RefObject<HTMLSpanElement | null>,
) {
    return (
        triggerRef.current?.contains(target) === true ||
        tooltipRef.current?.contains(target) === true
    );
}
