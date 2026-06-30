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


export default function SkillsPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="professional">{t("skills.slides.professional.navLabel")}</Timeline.Item>
                <Timeline.Item id="humanResources">{t("skills.slides.humanResources.navLabel")}</Timeline.Item>
                <Timeline.Item id="relational">{t("skills.slides.relational.navLabel")}</Timeline.Item>
                <Timeline.Item id="transverse">{t("skills.slides.transverse.navLabel")}</Timeline.Item>
                <Timeline.Item id="it">{t("skills.slides.it.navLabel")}</Timeline.Item>
                <Timeline.Item id="language">{t("skills.slides.language.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <Slide id="professional" navLabel={t("skills.slides.professional.navLabel")}>
                <SlideHeader eyebrow={t("skills.slides.professional.eyebrow")}>
                    <RichText i18nKey="skills.slides.professional.title" />
                </SlideHeader>
                <Paragraphs i18nKey="skills.slides.professional.paragraphs" />
            </Slide>

            <Slide id="humanResources" navLabel={t("skills.slides.humanResources.navLabel")}>
                <SlideHeader eyebrow={t("skills.slides.humanResources.eyebrow")}>
                    <RichText i18nKey="skills.slides.humanResources.title" />
                </SlideHeader>
                <Paragraphs i18nKey="skills.slides.humanResources.paragraphs" />
            </Slide>

            <Slide id="relational" navLabel={t("skills.slides.relational.navLabel")}>
                <SlideHeader eyebrow={t("skills.slides.relational.eyebrow")}>
                    <RichText i18nKey="skills.slides.relational.title" />
                </SlideHeader>
                <Paragraphs i18nKey="skills.slides.relational.paragraphs" />
            </Slide>

            <Slide id="transverse" navLabel={t("skills.slides.transverse.navLabel")}>
                <SlideHeader eyebrow={t("skills.slides.transverse.eyebrow")}>
                    <RichText i18nKey="skills.slides.transverse.title" />
                </SlideHeader>
                <Paragraphs i18nKey="skills.slides.transverse.paragraphs" />
            </Slide>

            <Slide id="it" navLabel={t("skills.slides.it.navLabel")}>
                <SlideHeader eyebrow={t("skills.slides.it.eyebrow")}>
                    <RichText i18nKey="skills.slides.it.title" />
                </SlideHeader>
                <Paragraphs i18nKey="skills.slides.it.paragraphs" />
            </Slide>

            <Slide id="language" navLabel={t("skills.slides.language.navLabel")}>
                <SlideHeader eyebrow={t("skills.slides.language.eyebrow")}>
                    <RichText i18nKey="skills.slides.language.title" />
                </SlideHeader>
                <Paragraphs i18nKey="skills.slides.language.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
