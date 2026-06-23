/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import styles from "./NavbarLogo.module.scss";

/** Logo rendered at the left side of the navigation bar. */
export default function NavbarLogo() {
    const { t } = useTranslation();

    return <a className={styles.brand} href="/" aria-label={t("home.title")} id="nav-home">
        <span className={styles.brandMark} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
        </span>
    </a>;
}
