/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";
import PresentationLayout, {
    PresentationDeck,
    PresentationTimeline,
} from "@/components/PresentationLayout";
import Timeline from "@/components/Timeline";
import Slide from "@/components/Slide";
import DynamicRenderer, { type DynamicBlock } from "@/components/DynamicRenderer";

interface SlideData {
    id: string;
    navLabel: string;
    blocks: DynamicBlock[];
    props?: Record<string, any>;
}

interface DynamicPageProps {
    /** The i18n key for the page (e.g., 'whoAmI'). */
    pageKey: string;
}

/**
 * Renders a full presentation page driven by i18n layout data.
 */
export default function DynamicPage({ pageKey }: DynamicPageProps) {
    const { t } = useTranslation();
    let slides = t(`${pageKey}.slides`, { returnObjects: true }) as SlideData[];

    if (!Array.isArray(slides)) {
        slides = t("home.slides", { returnObjects: true }) as SlideData[];
    }

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                {slides.map((slide) => (
                    <Timeline.Item key={slide.id} id={slide.id}>
                        {slide.navLabel}
                    </Timeline.Item>
                ))}
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            {slides.map((slide) => (
                <Slide
                    key={slide.id}
                    id={slide.id}
                    navLabel={slide.navLabel}
                    {...slide.props}
                >
                    <DynamicRenderer blocks={slide.blocks} />
                </Slide>
            ))}
        </PresentationDeck>
    </PresentationLayout>;
}
