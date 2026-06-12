/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";

import styles from "./index.module.scss";

export function Navbar(props: NavbarProps) {
    return (
        <header className={styles.header} data-visible={props.isVisible}>
            <a className={styles.brand} href="#" aria-label="Home page button">
                <span className={styles.brandMark} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                </span>
            </a>
            {props.children ? (
                <nav className={styles.nav} aria-label="Primary navigation">
                    <div className={styles.linkTrack}>{props.children}</div>
                </nav>
            ) : null}
        </header>
    );
}


export interface NavbarProps extends PropsWithChildren {
    /** Flag toggling navbar visibility. */
    isVisible: boolean;
}
