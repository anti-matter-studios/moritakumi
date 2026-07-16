/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from "react";

import type { SlideSplitStrategy } from "@/components/Paragraphs";


const MEDIUM_SLIDE_SPLIT_QUERY = "(max-width: 64rem), (max-height: 56rem)";
const SMALL_SLIDE_SPLIT_QUERY = "(max-width: 42rem), (max-height: 42rem)";
const SlideSplitStrategyContext = createContext<SlideSplitStrategy>("large");

/** Supplies one shared responsive split strategy to every slide in a deck. */
export function ResponsiveSlideSplitProvider({ children }: PropsWithChildren) {
    const strategy = useResponsiveSlideSplitStrategy();

    return <SlideSplitStrategyContext.Provider value={strategy}>
        {children}
    </SlideSplitStrategyContext.Provider>;
}

/** Returns the active large, medium, or small presentation layout. */
export function useSlideSplitStrategy() {
    return useContext(SlideSplitStrategyContext);
}

function useResponsiveSlideSplitStrategy() {
    const [strategy, setStrategy] = useState(getResponsiveSlideSplitStrategy);

    useEffect(() => {
        const mediumQuery = window.matchMedia(MEDIUM_SLIDE_SPLIT_QUERY);
        const smallQuery = window.matchMedia(SMALL_SLIDE_SPLIT_QUERY);
        const updateStrategy = () => {
            setStrategy(getResponsiveSlideSplitStrategy());
        };

        updateStrategy();
        mediumQuery.addEventListener("change", updateStrategy);
        smallQuery.addEventListener("change", updateStrategy);

        return () => {
            mediumQuery.removeEventListener("change", updateStrategy);
            smallQuery.removeEventListener("change", updateStrategy);
        };
    }, []);

    return strategy;
}

function getResponsiveSlideSplitStrategy(): SlideSplitStrategy {
    if (typeof window === "undefined") {
        return "large";
    }

    if (window.matchMedia(SMALL_SLIDE_SPLIT_QUERY).matches) {
        return "small";
    }

    if (window.matchMedia(MEDIUM_SLIDE_SPLIT_QUERY).matches) {
        return "medium";
    }

    return "large";
}
