/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    Children,
    cloneElement,
    type CSSProperties,
    type PropsWithChildren,
    type ReactElement,
    useMemo,
} from "react";

import TimelineItem from "./TimelineItem";
import {
    getTimelineItems,
    getTimelineSectionIds,
    isTimelineItem,
} from "./timelineChildren";
import styles from "./index.module.scss";
import { useActiveSectionId } from "./useActiveSectionId";


type TimelineStyle = CSSProperties & {
    "--timeline-progress": number;
};

type TimelineComponent = {
    (props: TimelineProps): ReactElement;
    Item: typeof TimelineItem;
};

/** Navigation track used to jump between presentation slides. */
const Timeline = ((props: TimelineProps) => {
    const items = useMemo(() => getTimelineItems(props.children), [props.children]);
    const sectionIds = useMemo(() => getTimelineSectionIds(props.children), [props.children]);
    const observedSectionId = useActiveSectionId(sectionIds);
    const activeSectionId = observedSectionId ?? sectionIds[0];
    const activeIndex = Math.max(
        0,
        items.findIndex((item) => item.props.id === activeSectionId),
    );
    const progress = items.length > 1
        ? activeIndex / (items.length - 1)
        : 0;
    const style: TimelineStyle = { "--timeline-progress": progress };

    return <nav className={styles.track} style={style} aria-label="Slide navigation">
        {Children.map(props.children, (child, index) => {
            if (!isTimelineItem(child)) {
                return child;
            }

            return cloneElement(child, {
                index,
                isActive: child.props.id === activeSectionId,
            });
        })}
    </nav>;
}) as TimelineComponent;

Timeline.Item = TimelineItem;

export default Timeline;

export type TimelineProps = PropsWithChildren;
export type { TimelineItemProps } from "./TimelineItem";
