/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import type { ComponentType } from "react";

import MyHobbiesPage from "./pages/MyHobbiesPage";
import MyTravelsPage from "./pages/MyTravelsPage";
import WhoAmIPage from "./pages/WhoAmIPage";
import HomePage from "./pages/HomePage";

const pages = {
    "home": HomePage,
    "who-am-i": WhoAmIPage,
    "my-hobbies": MyHobbiesPage,
    "my-travels": MyTravelsPage,
} satisfies Record<string, ComponentType>;

type PageName = keyof typeof pages;

export function App() {
    const routeName = getRouteName(document.location.pathname);
    const Page = isPageName(routeName) ? pages[routeName] : HomePage;

    return <Page />;
}

function getRouteName(pathname: string) {
    const routeName = pathname
        .replace(/\/index\.html$/, "")
        .replace(/\/$/, "")
        .split("/")
        .pop() ?? "";

    return routeName.replace(/\.html$/, "");
}

function isPageName(routeName: string): routeName is PageName {
    return routeName in pages;
}
