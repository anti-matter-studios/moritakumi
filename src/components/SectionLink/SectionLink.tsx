import styles from "./SectionLink.module.scss";

export type NavigationSection = {
    id: string;
    label: string;
    shortLabel?: string;
};

type SectionLinkProps = {
    section: NavigationSection;
    isActive?: boolean;
};

export function SectionLink({ section, isActive = false }: SectionLinkProps) {
    return (
        <a
            className={styles.link}
            data-active={isActive}
            href={`#${section.id}`}
            aria-current={isActive ? "page" : undefined}
        >
            <span className={styles.fullLabel}>{section.label}</span>
            <span className={styles.shortLabel}>
                {section.shortLabel ?? section.label}
            </span>
        </a>
    );
}
