import {
    SectionLink,
    type NavigationSection,
} from "../SectionLink/SectionLink";
import {
    ThemeToggle,
    type ThemeVariant,
} from "../ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.scss";

type NavbarProps = {
    sections: NavigationSection[];
    activeSectionId?: string;
    theme: ThemeVariant;
    isVisible: boolean;
    onThemeChange: (theme: ThemeVariant) => void;
};

export function Navbar({
    sections,
    activeSectionId,
    theme,
    isVisible,
    onThemeChange,
}: NavbarProps) {
    const homeSectionId = sections[0]?.id ?? "landing";

    return (
        <header className={styles.header} data-visible={isVisible}>
            <a className={styles.brand} href={`#${homeSectionId}`} aria-label="Go to home slide">
                <span className={styles.brandMark} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                </span>
            </a>
            <nav className={styles.nav} aria-label="Presentation sections">
                <div className={styles.linkTrack}>
                    {sections.map((section) => (
                        <SectionLink
                            key={section.id}
                            section={section}
                            isActive={section.id === activeSectionId}
                        />
                    ))}
                </div>
            </nav>
            <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </header>
    );
}
