/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useRef } from "react";
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
    const linkTrackRef = useRef<HTMLDivElement>(null);

    const links = t("navbar.links", { returnObjects: true }) as string[];

    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            scrollActiveLinkIntoView(linkTrackRef.current);
        });

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [links]);

    return <header className={styles.header} data-visible={isVisible}>
        <NavbarLogo />
        <nav className={styles.nav} aria-label="Primary navigation" id="nav-links">
            <div className={styles.linkTrack} ref={linkTrackRef}>
                {links.map(link => <NavbarLink id={link} key={link} />)}
            </div>
        </nav>
        <LanguageToggle />
    </header>;
}

function scrollActiveLinkIntoView(linkTrack: HTMLDivElement | null) {
    const activeLink = linkTrack?.querySelector<HTMLElement>("[data-active=\"true\"]");

    if (linkTrack === null || activeLink === undefined || activeLink === null) {
        return;
    }

    const centeredScrollLeft = activeLink.offsetLeft
        - (linkTrack.clientWidth - activeLink.offsetWidth) / 2;

    linkTrack.scrollTo({
        left: centeredScrollLeft,
        behavior: "instant",
    });
}
