/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    Children,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from "react";

import type { TimelineItemProps } from "./TimelineItem";

export function isTimelineItem(child: ReactNode): child is ReactElement<TimelineItemProps> {
    return isValidElement<TimelineItemProps>(child) && typeof child.props.id === "string";
}

export function getTimelineItems(children: ReactNode) {
    const items: ReactElement<TimelineItemProps>[] = [];

    Children.forEach(children, (child) => {
        if (isTimelineItem(child)) {
            items.push(child);
        }
    });

    return items;
}

export function getTimelineSectionIds(children: ReactNode) {
    return getTimelineItems(children).map((item) => item.props.id);
}
