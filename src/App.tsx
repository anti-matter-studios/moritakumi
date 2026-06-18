/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { PresentationPage } from "./pages/PresentationPage";
import WhoAmIPage from "./pages/WhoAmIPage";

export function App() {
    switch (document.location.pathname) {
    case "/who-am-i":
    case "/who-am-i.html":
        return <WhoAmIPage />;
    default:
        return <PresentationPage />;
    }
}
