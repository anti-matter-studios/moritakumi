/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    Children,
    cloneElement,
    isValidElement,
    type CSSProperties,
    type ReactElement,
    type ReactNode,
} from "react";

import styles from "./index.module.scss";

export function Timeline(props: TimelineProps) {
    const items = getTimelineItems(props.children);
    const activeIndex = Math.max(
        0,
        items.findIndex((item) => item.props.id === props.activeSectionId)
    );
    const progress = items.length > 1
        ? activeIndex / (items.length - 1)
        : 0;
    const style = { "--timeline-progress": progress } as CSSProperties;

    return (
        <aside className={styles.timeline} aria-label="Presentation timeline">
            <nav className={styles.track} style={style}>
                {Children.map(props.children, (child, index) => {
                    if (!isTimelineItem(child)) {
                        return child;
                    }

                    return cloneElement(child, {
                        index,
                        isActive: child.props.id === props.activeSectionId,
                    });
                })}
            </nav>
        </aside>
    );
}

function isTimelineItem(child: ReactNode): child is ReactElement<TimelineItemProps> {
    return isValidElement<TimelineItemProps>(child) && "id" in child.props;
}

export function getTimelineSectionIds(children: ReactNode) {
    const ids: string[] = [];

    Children.forEach(children, (child) => {
        if (isTimelineItem(child)) {
            ids.push(child.props.id);
        }
    });

    return ids;
}

function getTimelineItems(children: ReactNode) {
    const items: ReactElement<TimelineItemProps>[] = [];

    Children.forEach(children, (child) => {
        if (isTimelineItem(child)) {
            items.push(child);
        }
    });

    return items;
}

export function TimelineItem(props: TimelineItemProps) {
    return (
        <a
            className={styles.link}
            data-active={props.isActive}
            href={`#${props.id}`}
            aria-current={props.isActive ? "step" : undefined}
        >
            <span className={styles.marker}>
                <span>{(props.index ?? 0) + 1}</span>
            </span>
            <span className={styles.label}>{props.children}</span>
        </a>
    );
}

export interface TimelineProps {
    /** Identifier of the section currently in view. */
    activeSectionId?: string;

    /** Timeline entries. */
    children: ReactNode;
}

export interface TimelineItemProps {
    /** Unique identifier of the target slide section. */
    id: string;

    /** Label rendered by the timeline. */
    children: ReactNode;

    /** Index injected by the timeline parent. */
    index?: number;

    /** Flag injected by the timeline parent when this item is current. */
    isActive?: boolean;
}

Timeline.Item = TimelineItem;
