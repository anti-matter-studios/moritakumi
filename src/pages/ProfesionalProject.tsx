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
            <ProjectSlide slideKey="shortTerm" />
            <ProjectSlide slideKey="longTerm" />
            <ProjectSlide slideKey="ideal" />
            <ProjectSlide slideKey="aim" />
            <ProjectSlide slideKey="environment" />
            <ProjectSlide slideKey="plan" />
        </PresentationDeck>
    </PresentationLayout>;
}

function ProjectSlide({ slideKey }: { slideKey: ProjectSlideKey }) {
    const { t } = useTranslation();

    return <ResponsiveSlide
        id={slideKey}
        navLabel={t(`project.slides.${slideKey}.navLabel`)}
        paragraphsI18nKey={`project.slides.${slideKey}.paragraphs`}
        header={<SlideHeader><RichText i18nKey={`project.slides.${slideKey}.title`} /></SlideHeader>}
    />;
}

type ProjectSlideKey = "shortTerm" | "longTerm" | "ideal" | "aim" | "environment" | "plan";
