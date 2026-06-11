import type { ReactNode } from "react";
import styles from "./Slide.module.scss";

export type SlideProps = {
    id: string;
    navLabel: string;
    shortNavLabel?: string;
    tone?: "blue" | "lilac" | "mint" | "rose";
    children: ReactNode;
};

export type SlideHeaderProps = {
    eyebrow: string;
    title: string;
    children?: ReactNode;
};

type SlideCardGridProps = {
    children: ReactNode;
};

type SlideCardProps = {
    title: string;
    children: ReactNode;
};

export function Slide({
    id,
    navLabel,
    tone = "blue",
    children,
}: SlideProps) {
    return (
        <section
            className={styles.slide}
            data-tone={tone}
            id={id}
            aria-label={navLabel}
            data-nav-label={navLabel}
        >
            <div className={styles.content}>{children}</div>
        </section>
    );
}

export function SlideHeader({ eyebrow, title, children }: SlideHeaderProps) {
    return (
        <header className={styles.header}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
            {children ? <div className={styles.summary}>{children}</div> : null}
        </header>
    );
}

export function SlideCardGrid({ children }: SlideCardGridProps) {
    return <div className={styles.cardGrid}>{children}</div>;
}

export function SlideCard({ title, children }: SlideCardProps) {
    return (
        <article className={styles.card}>
            <h2>{title}</h2>
            <div>{children}</div>
        </article>
    );
}
