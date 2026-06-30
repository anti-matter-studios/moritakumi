/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    Children,
    cloneElement,
    isValidElement,
    type CSSProperties,
    type PropsWithChildren,
    type ReactElement,
    type ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";

import styles from "./index.module.scss";


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

function useActiveSectionId(sectionIds: string[]) {
    const [activeSectionId, setActiveSectionId] = useState<string>();

    useEffect(() => {
        if (sectionIds.length === 0) {
            return;
        }

        const deck = document.getElementById("presentation");
        const sections = getTimelineSections(deck, sectionIds);

        if (sections.length === 0) {
            return;
        }

        const sectionVisibility = new Map<Element, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    sectionVisibility.set(
                        entry.target,
                        entry.isIntersecting ? entry.intersectionRatio : 0,
                    );
                }

                const activeSection = sections
                    .map((section) => ({
                        section,
                        visibility: sectionVisibility.get(section) ?? 0,
                    }))
                    .sort((first, second) => second.visibility - first.visibility)
                    .at(0);

                if (activeSection !== undefined && activeSection.visibility > 0) {
                    setActiveSectionId(getTimelineSectionId(activeSection.section));
                }
            },
            {
                root: deck,
                threshold: [0.42, 0.6, 0.78],
            },
        );

        for (const section of sections) {
            observer.observe(section);
        }

        return () => {
            observer.disconnect();
        };
    }, [sectionIds]);

    return activeSectionId;
}

function getTimelineSections(deck: HTMLElement | null, sectionIds: string[]) {
    if (deck === null) {
        return [];
    }

    return Array.from(deck.children)
        .filter((child): child is HTMLElement => child instanceof HTMLElement)
        .filter((section) => sectionIds.includes(getTimelineSectionId(section)));
}

function getTimelineSectionId(section: HTMLElement) {
    return section.dataset.slideId ?? section.id;
}

function isTimelineItem(child: ReactNode): child is ReactElement<TimelineItemProps> {
    return isValidElement<TimelineItemProps>(child) && typeof child.props.id === "string";
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

function getTimelineSectionIds(children: ReactNode) {
    const sectionIds: string[] = [];

    Children.forEach(children, (child) => {
        if (isTimelineItem(child)) {
            sectionIds.push(child.props.id);
        }
    });

    return sectionIds;
}

/** Entry in the presentation timeline. */
function TimelineItem(props: TimelineItemProps) {
    return <a
        className={styles.link}
        data-active={props.isActive}
        href={`#${props.id}`}
        aria-current={props.isActive ? "step" : undefined}
    >
        <span className={styles.marker}>
            <span>{(props.index ?? 0) + 1}</span>
        </span>
        <span className={styles.label}>{props.children}</span>
    </a>;
}

export type TimelineProps = PropsWithChildren;

export interface TimelineItemProps extends PropsWithChildren {
    /** Unique identifier of the target slide. */
    id: string;

    /** Index injected by the timeline parent. */
    index?: number;

    /** Flag injected by the timeline parent when this item is current. */
    isActive?: boolean;
}
