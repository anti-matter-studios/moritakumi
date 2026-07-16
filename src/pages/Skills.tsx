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
            <ResponsiveSlide
                id="professional"
                navLabel={t("skills.slides.professional.navLabel")}
                paragraphsI18nKey="skills.slides.professional.paragraphs"
                header={<SlideHeader eyebrow={t("skills.slides.professional.eyebrow")}>
                    <RichText i18nKey="skills.slides.professional.title" />
                </SlideHeader>}
            />

            <ResponsiveSlide
                id="humanResources"
                navLabel={t("skills.slides.humanResources.navLabel")}
                paragraphsI18nKey="skills.slides.humanResources.paragraphs"
                header={<SlideHeader eyebrow={t("skills.slides.humanResources.eyebrow")}>
                    <RichText i18nKey="skills.slides.humanResources.title" />
                </SlideHeader>}
            />

            <ResponsiveSlide
                id="relational"
                navLabel={t("skills.slides.relational.navLabel")}
                paragraphsI18nKey="skills.slides.relational.paragraphs"
                header={<SlideHeader eyebrow={t("skills.slides.relational.eyebrow")}>
                    <RichText i18nKey="skills.slides.relational.title" />
                </SlideHeader>}
            />

            <ResponsiveSlide
                id="transverse"
                navLabel={t("skills.slides.transverse.navLabel")}
                paragraphsI18nKey="skills.slides.transverse.paragraphs"
                header={<SlideHeader eyebrow={t("skills.slides.transverse.eyebrow")}>
                    <RichText i18nKey="skills.slides.transverse.title" />
                </SlideHeader>}
            />

            <ResponsiveSlide
                id="it"
                navLabel={t("skills.slides.it.navLabel")}
                paragraphsI18nKey="skills.slides.it.paragraphs"
                header={<SlideHeader eyebrow={t("skills.slides.it.eyebrow")}>
                    <RichText i18nKey="skills.slides.it.title" />
                </SlideHeader>}
            />

            <ResponsiveSlide
                id="language"
                navLabel={t("skills.slides.language.navLabel")}
                paragraphsI18nKey="skills.slides.language.paragraphs"
                header={<SlideHeader eyebrow={t("skills.slides.language.eyebrow")}>
                    <RichText i18nKey="skills.slides.language.title" />
                </SlideHeader>}
            />
        </PresentationDeck>
    </PresentationLayout>;
}
