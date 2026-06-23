/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import DynamicPage from "./components/DynamicPage";

export function App() {
    return <DynamicPage pageKey={getRouteName(document.location.pathname)} />;
}

function getRouteName(pathname: string) {
    const routeName = pathname
        .replace(/\/index\.html$/, "")
        .replace(/\/$/, "")
        .split("/")
        .pop() ?? "";

    return routeName.replace(/\.html$/, "");
}
