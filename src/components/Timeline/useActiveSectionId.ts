/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useState } from "react";

/** Observes presentation slides and returns the section id currently in view. */
export function useActiveSectionId(sectionIds: string[]) {
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

        return observeSections(sections, deck, setActiveSectionId);
    }, [sectionIds]);

    return activeSectionId;
}

function observeSections(
    sections: HTMLElement[],
    deck: HTMLElement | null,
    setActiveSectionId: (id: string) => void,
) {
    const sectionVisibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                sectionVisibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
            }

            const activeSection = sections
                .map((section) => ({ section, visibility: sectionVisibility.get(section) ?? 0 }))
                .sort((first, second) => second.visibility - first.visibility)
                .at(0);

            if (activeSection !== undefined && activeSection.visibility > 0) {
                setActiveSectionId(getTimelineSectionId(activeSection.section));
            }
        },
        { root: deck, threshold: [0.42, 0.6, 0.78] },
    );

    for (const section of sections) {
        observer.observe(section);
    }

    return () => {
        observer.disconnect();
    };
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
