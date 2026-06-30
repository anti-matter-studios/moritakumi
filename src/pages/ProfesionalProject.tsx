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


export default function ProfessionalProjectPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="shortTerm">{t("project.slides.shortTerm.navLabel")}</Timeline.Item>
                <Timeline.Item id="longTerm">{t("project.slides.longTerm.navLabel")}</Timeline.Item>
                <Timeline.Item id="ideal">{t("project.slides.ideal.navLabel")}</Timeline.Item>
                <Timeline.Item id="aim">{t("project.slides.aim.navLabel")}</Timeline.Item>
                <Timeline.Item id="environment">{t("project.slides.environment.navLabel")}</Timeline.Item>
                <Timeline.Item id="plan">{t("project.slides.plan.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <Slide id="shortTerm" navLabel={t("project.slides.shortTerm.navLabel")}>
                <SlideHeader><RichText i18nKey="project.slides.shortTerm.title" /></SlideHeader>
                <Paragraphs i18nKey="project.slides.shortTerm.paragraphs" />
            </Slide>

            <Slide id="longTerm" navLabel={t("project.slides.longTerm.navLabel")}>
                <SlideHeader><RichText i18nKey="project.slides.longTerm.title" /></SlideHeader>
                <Paragraphs i18nKey="project.slides.longTerm.paragraphs" />
            </Slide>

            <Slide id="ideal" navLabel={t("project.slides.ideal.navLabel")}>
                <SlideHeader><RichText i18nKey="project.slides.ideal.title" /></SlideHeader>
                <Paragraphs i18nKey="project.slides.ideal.paragraphs" />
            </Slide>

            <Slide id="aim" navLabel={t("project.slides.aim.navLabel")}>
                <SlideHeader><RichText i18nKey="project.slides.aim.title" /></SlideHeader>
                <Paragraphs i18nKey="project.slides.aim.paragraphs" />
            </Slide>

            <Slide id="environment" navLabel={t("project.slides.environment.navLabel")}>
                <SlideHeader><RichText i18nKey="project.slides.environment.title" /></SlideHeader>
                <Paragraphs i18nKey="project.slides.environment.paragraphs" />
            </Slide>

            <Slide id="plan" navLabel={t("project.slides.plan.navLabel")}>
                <SlideHeader><RichText i18nKey="project.slides.plan.title" /></SlideHeader>
                <Paragraphs i18nKey="project.slides.plan.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
