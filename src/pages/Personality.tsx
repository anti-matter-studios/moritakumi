/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import PresentationLayout, {
    PresentationDeck,
    PresentationTimeline
} from "@/components/PresentationLayout";
import RichText from "@/components/RichText";
import { ResponsiveSlide, SlideHeader } from "@/components/Slide";
import Timeline from "@/components/Timeline";


export default function PersonalityPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="introduction">{t("personality.slides.introduction.navLabel")}</Timeline.Item>
                <Timeline.Item id="relational">{t("personality.slides.relational.navLabel")}</Timeline.Item>
                <Timeline.Item id="vision">{t("personality.slides.vision.navLabel")}</Timeline.Item>
                <Timeline.Item id="sensibility">{t("personality.slides.sensibility.navLabel")}</Timeline.Item>
                <Timeline.Item id="organisation">{t("personality.slides.organisation.navLabel")}</Timeline.Item>
                <Timeline.Item id="confidence">{t("personality.slides.confidence.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <ResponsiveSlide
                id="introduction"
                navLabel={t("personality.slides.introduction.navLabel")}
                paragraphsI18nKey="personality.slides.introduction.paragraphs"
                header={<SlideHeader><RichText i18nKey="personality.slides.introduction.title" /></SlideHeader>}
                paragraphComponents={{
                        personalities: <a href="https://16-personalities.com" />,
                }}
            />

            <ResponsiveSlide
                id="relational"
                navLabel={t("personality.slides.relational.navLabel")}
                paragraphsI18nKey="personality.slides.relational.paragraphs"
                header={<SlideHeader><RichText i18nKey="personality.slides.relational.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="vision"
                navLabel={t("personality.slides.vision.navLabel")}
                paragraphsI18nKey="personality.slides.vision.paragraphs"
                header={<SlideHeader><RichText i18nKey="personality.slides.vision.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="sensibility"
                navLabel={t("personality.slides.sensibility.navLabel")}
                paragraphsI18nKey="personality.slides.sensibility.paragraphs"
                header={<SlideHeader><RichText i18nKey="personality.slides.sensibility.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="organisation"
                navLabel={t("personality.slides.organisation.navLabel")}
                paragraphsI18nKey="personality.slides.organisation.paragraphs"
                header={<SlideHeader><RichText i18nKey="personality.slides.organisation.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="confidence"
                navLabel={t("personality.slides.confidence.navLabel")}
                paragraphsI18nKey="personality.slides.confidence.paragraphs"
                header={<SlideHeader><RichText i18nKey="personality.slides.confidence.title" /></SlideHeader>}
            />
        </PresentationDeck>
    </PresentationLayout>;
}
