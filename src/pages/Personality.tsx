/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import Paragraphs from "@/components/Paragraphs";
import PresentationLayout, {
    PresentationDeck,
    PresentationTimeline
} from "@/components/PresentationLayout";
import RichText from "@/components/RichText";
import Slide, { SlideHeader } from "@/components/Slide";
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
            <Slide id="introduction" navLabel={t("personality.slides.introduction.navLabel")}>
                <SlideHeader><RichText i18nKey="personality.slides.introduction.title" /></SlideHeader>
                <Paragraphs i18nKey="personality.slides.introduction.paragraphs" />
            </Slide>

            <Slide id="relational" navLabel={t("personality.slides.relational.navLabel")}>
                <SlideHeader><RichText i18nKey="personality.slides.relational.title" /></SlideHeader>
                <Paragraphs i18nKey="personality.slides.relational.paragraphs" />
            </Slide>

            <Slide id="vision" navLabel={t("personality.slides.vision.navLabel")}>
                <SlideHeader><RichText i18nKey="personality.slides.vision.title" /></SlideHeader>
                <Paragraphs i18nKey="personality.slides.vision.paragraphs" />
            </Slide>

            <Slide id="sensibility" navLabel={t("personality.slides.sensibility.navLabel")}>
                <SlideHeader><RichText i18nKey="personality.slides.sensibility.title" /></SlideHeader>
                <Paragraphs i18nKey="personality.slides.sensibility.paragraphs" />
            </Slide>

            <Slide id="organisation" navLabel={t("personality.slides.organisation.navLabel")}>
                <SlideHeader><RichText i18nKey="personality.slides.organisation.title" /></SlideHeader>
                <Paragraphs i18nKey="personality.slides.organisation.paragraphs" />
            </Slide>

            <Slide id="confidence" navLabel={t("personality.slides.confidence.navLabel")}>
                <SlideHeader><RichText i18nKey="personality.slides.confidence.title" /></SlideHeader>
                <Paragraphs i18nKey="personality.slides.confidence.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
