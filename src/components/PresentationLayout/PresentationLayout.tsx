import {
    Children,
    cloneElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
    type UIEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { Navbar } from "../Navbar";
import { getTimelineSectionIds, type TimelineProps } from "../Timeline";
import type { SlideProps } from "../Slide/Slide";
import styles from "./PresentationLayout.module.scss";


type PresentationLayoutProps = {
    timeline: ReactElement<TimelineProps>;
    children: ReactNode;
};

function isSlideElement(child: ReactNode): child is ReactElement<SlideProps> {
    return isValidElement<SlideProps>(child) && "navLabel" in child.props;
}

export function PresentationLayout({ children, timeline }: PresentationLayoutProps) {
    const [activeSectionId, setActiveSectionId] = useState<string>();
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const deckRef = useRef<HTMLElement | null>(null);
    const lastScrollTop = useRef(0);
    const scrollFrame = useRef<number | null>(null);
    const slides = useMemo(
        () => Children.toArray(children).filter(isSlideElement),
        [children]
    );
    const sectionIds = useMemo(
        () => getTimelineSectionIds(timeline.props.children),
        [timeline]
    );

    useEffect(() => {
        if (activeSectionId === undefined && sectionIds[0] !== undefined) {
            setActiveSectionId(sectionIds[0]);
        }
    }, [activeSectionId, sectionIds]);

    useEffect(() => {
        const deck = deckRef.current;

        if (deck === null || sectionIds.length === 0) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

                if (visibleEntry) {
                    setActiveSectionId(visibleEntry.target.id);
                }
            },
            {
                root: deck,
                threshold: [0.45, 0.6, 0.75]
            }
        );

        for (const sectionId of sectionIds) {
            const section = document.getElementById(sectionId);

            if (section !== null) {
                observer.observe(section);
            }
        }

        return () => observer.disconnect();
    }, [sectionIds]);

    useEffect(() => {
        return () => {
            if (scrollFrame.current !== null) {
                cancelAnimationFrame(scrollFrame.current);
            }
        };
    }, []);

    const handleDeckScroll = useCallback((event: UIEvent<HTMLElement>) => {
        const deck = event.currentTarget;

        if (scrollFrame.current !== null) {
            cancelAnimationFrame(scrollFrame.current);
        }

        scrollFrame.current = requestAnimationFrame(() => {
            const scrollTop = deck.scrollTop;
            const scrollDelta = scrollTop - lastScrollTop.current;

            if (scrollTop < 24) {
                setIsNavbarVisible(true);
            } else if (scrollDelta > 8) {
                setIsNavbarVisible(false);
            } else if (scrollDelta < -8) {
                setIsNavbarVisible(true);
            }

            lastScrollTop.current = scrollTop;
        });
    }, []);

    return (
        <>
            <Navbar isVisible={isNavbarVisible} />
            {cloneElement(timeline, { activeSectionId })}
            <main
                className={styles.deck}
                onScroll={handleDeckScroll}
                ref={deckRef}
            >
                {slides}
            </main>
        </>
    );
}
