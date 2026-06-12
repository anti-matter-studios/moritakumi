/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import classNames from "classnames";
import type { PropsWithChildren } from "react";

import styles from "./NavbarLink.module.scss";

/** Component used to render a single link of the navbar. */
export function NavbarLink(props: SectionLinkProps) {
    return (
        <a
            className={classNames(styles.link, props.className)}
            data-active={props.isActive}
            href={`#${props.id}`}
            aria-current={props.isActive ? "page" : undefined}
        >
            {props.children}
        </a>
    );
}

export interface SectionLinkProps extends PropsWithChildren {
    /** Flag set if the section should show as being active. */
    isActive?: boolean;

    /** Unique identifier for the section. */
    id: string;

    /** A class name added to the root element. */
    className?: string;
}