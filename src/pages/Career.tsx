/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Paragraphs, {
    type SlideSplitStrategy,
    splitParagraphsAtSlideBreaks
} from "@/components/Paragraphs";
import PresentationLayout, {
    PresentationDeck,
    PresentationTimeline
} from "@/components/PresentationLayout";
import RichText from "@/components/RichText";
import Slide, { SlideHeader } from "@/components/Slide";
import Timeline from "@/components/Timeline";


const MEDIUM_SLIDE_SPLIT_QUERY = "(max-width: 64rem), (max-height: 56rem)";
const SMALL_SLIDE_SPLIT_QUERY = "(max-width: 42rem), (max-height: 42rem)";

export default function CareerPage() {
    const { t } = useTranslation();
    const slideSplitStrategy = useResponsiveSlideSplitStrategy();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="socren1">{t("career.slides.socren1.navLabel")}</Timeline.Item>
                <Timeline.Item id="socren2">{t("career.slides.socren2.navLabel")}</Timeline.Item>
                <Timeline.Item id="efs">{t("career.slides.efs.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <CareerSlide slideKey="socren1" splitStrategy={slideSplitStrategy} />
            <CareerSlide slideKey="socren2" splitStrategy={slideSplitStrategy} />
            <CareerSlide slideKey="efs" splitStrategy={slideSplitStrategy} />
        </PresentationDeck>
    </PresentationLayout>;
}

function CareerSlide({ slideKey, splitStrategy }: CareerSlideProps) {
    const { t } = useTranslation();
    const paragraphs = getCareerParagraphs(t, slideKey);
    const chunks = splitParagraphsAtSlideBreaks(paragraphs, splitStrategy);

    return <>
        {chunks.map((chunk, index) => {
            const slideId = getSplitSlideId(slideKey, index);

            return <Slide
                id={slideId}
                key={slideId}
                slideId={slideKey}
                navLabel={t(`career.slides.${slideKey}.navLabel`)}
                fullWidth
            >
                <SlideHeader eyebrow={t(`career.slides.${slideKey}.eyebrow`)} small>
                    <RichText i18nKey={`career.slides.${slideKey}.title`} />
                </SlideHeader>
                <Paragraphs paragraphs={chunk.paragraphs} />
            </Slide>;
        })}
    </>;
}

function getCareerParagraphs(t: TFunction, slideKey: string): string[] {
    const paragraphs = t(`career.slides.${slideKey}.paragraphs`, { returnObjects: true });

    if (!isStringArray(paragraphs)) {
        return [];
    }

    return paragraphs;
}

function getSplitSlideId(slideKey: string, index: number) {
    return index === 0 ? slideKey : `${slideKey}-${(index + 1).toString()}`;
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
        window.addEventListener("resize", updateStrategy, { passive: true });
        mediumQuery.addEventListener("change", updateStrategy);
        smallQuery.addEventListener("change", updateStrategy);

        return () => {
            window.removeEventListener("resize", updateStrategy);
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

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

interface CareerSlideProps {
    /** Translation key under career.slides. */
    slideKey: string;

    /** Active split strategy for explicit paragraph split markers. */
    splitStrategy: SlideSplitStrategy;
}

type TFunction = ReturnType<typeof useTranslation>["t"];
