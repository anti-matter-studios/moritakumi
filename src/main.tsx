import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.scss";

const root = document.getElementById("root");
if (!root) {
    window.alert("Root element not found");
} else {
    createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

