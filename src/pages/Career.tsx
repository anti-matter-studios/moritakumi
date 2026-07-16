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


export default function CareerPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="socren1">{t("career.slides.socren1.navLabel")}</Timeline.Item>
                <Timeline.Item id="socren2">{t("career.slides.socren2.navLabel")}</Timeline.Item>
                <Timeline.Item id="efs">{t("career.slides.efs.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <CareerSlide slideKey="socren1" />
            <CareerSlide slideKey="socren2" />
            <CareerSlide slideKey="efs" />
        </PresentationDeck>
    </PresentationLayout>;
}

function CareerSlide({ slideKey }: CareerSlideProps) {
    const { t } = useTranslation();

    return <ResponsiveSlide
        id={slideKey}
        navLabel={t(`career.slides.${slideKey}.navLabel`)}
        paragraphsI18nKey={`career.slides.${slideKey}.paragraphs`}
        header={
            <SlideHeader eyebrow={t(`career.slides.${slideKey}.eyebrow`)} small>
                <RichText i18nKey={`career.slides.${slideKey}.title`} />
            </SlideHeader>
        }
        fullWidth
    />;
}

interface CareerSlideProps {
    /** Translation key under career.slides. */
    slideKey: string;

}
