import { useEffect, useState } from "react";

export function useActiveSection<TSectionId extends string>(
    sectionIds: readonly TSectionId[],
) {
    const [activeSectionId, setActiveSectionId] = useState<TSectionId>(
        sectionIds[0],
    );

    useEffect(() => {
        const sections = sectionIds
            .map((sectionId) => document.getElementById(sectionId))
            .filter((section): section is HTMLElement => section !== null);

        if (sections.length === 0) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

                if (visibleEntry) {
                    setActiveSectionId(visibleEntry.target.id as TSectionId);
                }
            },
            { threshold: [0.45, 0.6, 0.75] },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeSectionId;
}
