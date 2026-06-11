import styles from "./ThemeToggle.module.scss";

export type ThemeVariant =
    | "green-studio"
    | "green-sage"
    | "green-sea"
    | "green-dark";

const themeVariants: ThemeVariant[] = [
    "green-studio",
    "green-sage",
    "green-sea",
    "green-dark",
];

const themeLabels: Record<ThemeVariant, string> = {
    "green-studio": "Studio",
    "green-sage": "Sage",
    "green-sea": "Sea",
    "green-dark": "Dark",
};

type ThemeToggleProps = {
    theme: ThemeVariant;
    onThemeChange: (theme: ThemeVariant) => void;
};

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
    const activeIndex = themeVariants.indexOf(theme);
    const nextTheme = themeVariants[(activeIndex + 1) % themeVariants.length];

    return (
        <button
            className={styles.toggle}
            type="button"
            onClick={() => onThemeChange(nextTheme)}
            aria-label={`Switch theme. Current theme is ${themeLabels[theme]}.`}
        >
            <span className={styles.swatches} aria-hidden="true">
                {themeVariants.map((variant) => (
                    <span
                        className={styles.swatch}
                        data-theme-option={variant}
                        data-active={variant === theme}
                        key={variant}
                    />
                ))}
            </span>
            <span className={styles.label}>{themeLabels[theme]}</span>
        </button>
    );
}
