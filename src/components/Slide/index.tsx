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
import BackgroundImage, {
    type BackgroundImageProps,
} from "../BackgroundImage";
import SlideHeader, { type SlideHeaderProps } from "./SlideHeader";
import SlideCard, { type SlideCardProps } from "./SlideCard";

import styles from "./index.module.scss";

export { SlideHeader, SlideCard };
export type { SlideHeaderProps, SlideCardProps };

export type SlideProps = {
    id: string;
    navLabel: string;
    shortNavLabel?: string;
    tone?: "blue" | "lilac" | "mint" | "rose";
    children: ReactNode;
};

type SlideCardGridProps = {
    children: ReactNode;
};

type SlideChildren = {
    backgrounds: ReactElement<BackgroundImageProps>[];
    content: ReactNode[];
};

function isBackgroundImageElement(
    child: ReactNode,
): child is ReactElement<BackgroundImageProps> {
    return isValidElement(child) && child.type === BackgroundImage;
}

function getSlideChildren(children: ReactNode): SlideChildren {
    const backgrounds: ReactElement<BackgroundImageProps>[] = [];
    const content: ReactNode[] = [];

    Children.forEach(children, (child) => {
        if (isBackgroundImageElement(child)) {
            backgrounds.push(child);
            return;
        }

        content.push(child);
    });

    return { backgrounds, content };
}


export function Slide({
    id,
    navLabel,
    tone = "blue",
    children,
}: SlideProps) {
    const slideChildren = getSlideChildren(children);

    return (
        <section
            className={styles.slide}
            data-tone={tone}
            id={id}
            aria-label={navLabel}
            data-nav-label={navLabel}
        >
            {slideChildren.backgrounds}
            <div className={styles.content}>{slideChildren.content}</div>
        </section>
    );
}

export function SlideCardGrid({ children }: SlideCardGridProps) {
    return <div className={styles.cardGrid}>{children}</div>;
}
