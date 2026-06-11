import {
    Children,
    isValidElement,
    type ReactElement,
    type ReactNode,
    type UIEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import { Navbar } from "../Navbar/Navbar";
import type { NavigationSection } from "../SectionLink/SectionLink";
import type { SlideProps } from "../Slide/Slide";
import type { ThemeVariant } from "../ThemeToggle/ThemeToggle";
import styles from "./PresentationLayout.module.scss";

type PresentationLayoutProps = {
    children: ReactNode;
};

function isSlideElement(child: ReactNode): child is ReactElement<SlideProps> {
    return isValidElement<SlideProps>(child) && "navLabel" in child.props;
}

export function PresentationLayout({ children }: PresentationLayoutProps) {
    const [theme, setTheme] = useState<ThemeVariant>("green-studio");
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const lastScrollTop = useRef(0);
    const scrollFrame = useRef<number | null>(null);
    const slides = useMemo(
        () => Children.toArray(children).filter(isSlideElement),
        [children],
    );
    const sections = useMemo<NavigationSection[]>(
        () =>
            slides.map((slide) => ({
                id: slide.props.id,
                label: slide.props.navLabel,
                shortLabel: slide.props.shortNavLabel,
            })),
        [slides],
    );
    const sectionIds = useMemo(
        () => sections.map((section) => section.id),
        [sections],
    );
    const activeSectionId = useActiveSection(sectionIds);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

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
        <div className={styles.app} data-theme={theme}>
            <Navbar
                sections={sections}
                activeSectionId={activeSectionId}
                theme={theme}
                isVisible={isNavbarVisible}
                onThemeChange={setTheme}
            />
            <main className={styles.deck} onScroll={handleDeckScroll}>
                {slides}
            </main>
        </div>
    );
}
