/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import { SlideCard, SlideCardList } from "@/components/Slide";
import RichText from "@/components/RichText";


/** Renders place cards from a simple translation array. */
export function PlaceCards(props: PlaceCardsProps) {
    const { t } = useTranslation();
    const places = t(props.i18nKey, { returnObjects: true });

    if (!isStringArray(places)) {
        return null;
    }

    return <SlideCardList>
        {places.map((place) => (
            <SlideCard key={place} title={<RichText>{place}</RichText>} />
        ))}
    </SlideCardList>;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

interface PlaceCardsProps {
    /** Translation key resolving to a list of card titles. */
    i18nKey: string;
}
