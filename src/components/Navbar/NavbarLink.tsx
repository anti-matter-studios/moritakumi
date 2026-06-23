/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import styles from "./NavbarLink.module.scss";

/** Link rendered inside the navigation bar. */
export default function NavbarLink(props: NavbarLinkProps) {
    const { t } = useTranslation();
    const pageName = getPageName(document.location.pathname);
    const isActive = props.id === pageName;

    return <a
        className={styles.link}
        data-active={isActive}
        aria-current={isActive}
        id={`nav-link-${props.id}`}
        href={`/${props.id}`}
    >
        {t(`${props.id}.title`)}
    </a>;
}

interface NavbarLinkProps extends PropsWithChildren {
    /** Unique identifier of the link in the navbar. */
    id: string;
}

function getPageName(pathname: string) {
    const pageName = pathname
        .replace(/\/$/, "")
        .split("/")
        .pop() ?? "";

    if (pageName === "index.html") {
        return "";
    }

    return pageName.replace(/\.html$/, "");
}

