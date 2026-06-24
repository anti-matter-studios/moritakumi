/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import useVisible from "./hooks/visible";
import LanguageToggle from "./LanguageToggle";
import NavbarLink from "./NavbarLink";
import NavbarLogo from "./NavbarLogo";
import styles from "./index.module.scss";

/** Navigation bar component that is always rendered on the page. */
export default function Navbar() {
    const { t } = useTranslation();
    const isVisible = useVisible();


    const links = t("navbar.links", { returnObjects: true }) as string[];

    return <header className={styles.header} data-visible={isVisible}>
        <NavbarLogo />
        <nav className={styles.nav} aria-label="Primary navigation" id="nav-links">
            <div className={styles.linkTrack}>
                {links.map(link => <NavbarLink id={link} key={link} />)}
            </div>
        </nav>
        <LanguageToggle />
    </header>;
}
