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
import type { BackgroundImageProps } from "@/components/BackgroundImage";
import Timeline from "@/components/Timeline";


const thanksBackgroundImages = {
    brother: {
        src: "/images/my-brother.jpg",
        width: 1299,
        height: 982,
        placement: "top-right",
    },
    efs: {
        src: "/images/efs.png",
        width: 300,
        height: 300,
        placement: "top-right",
    },
    tutors: {
        src: "/images/tutors.jpg",
        width: 1694,
        height: 1693,
        placement: "top-right",
    },
} satisfies Partial<Record<ThanksSlideKey, BackgroundImageProps>>;

export default function ThanksPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="brother">{t("thanks.slides.brother.navLabel")}</Timeline.Item>
                <Timeline.Item id="family">{t("thanks.slides.family.navLabel")}</Timeline.Item>
                <Timeline.Item id="school">{t("thanks.slides.school.navLabel")}</Timeline.Item>
                <Timeline.Item id="efs">{t("thanks.slides.efs.navLabel")}</Timeline.Item>
                <Timeline.Item id="tutors">{t("thanks.slides.tutors.navLabel")}</Timeline.Item>
                <Timeline.Item id="team">{t("thanks.slides.team.navLabel")}</Timeline.Item>
                <Timeline.Item id="personnel">{t("thanks.slides.personnel.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <ThanksSlide slideKey="brother" />
            <ThanksSlide slideKey="family" />
            <ThanksSlide slideKey="school" />
            <ThanksSlide slideKey="efs" />
            <ThanksSlide slideKey="tutors" />
            <ThanksSlide slideKey="team" />
            <ThanksSlide slideKey="personnel" />
        </PresentationDeck>
    </PresentationLayout>;
}

function ThanksSlide({ slideKey }: { slideKey: ThanksSlideKey }) {
    const { t } = useTranslation();
    const backgroundImage = slideKey in thanksBackgroundImages
        ? thanksBackgroundImages[slideKey as keyof typeof thanksBackgroundImages]
        : undefined;

    return <ResponsiveSlide
        id={slideKey}
        navLabel={t(`thanks.slides.${slideKey}.navLabel`)}
        paragraphsI18nKey={`thanks.slides.${slideKey}.paragraphs`}
        header={<SlideHeader><RichText i18nKey={`thanks.slides.${slideKey}.title`} /></SlideHeader>}
        backgroundImage={backgroundImage}
    />;
}

type ThanksSlideKey = "brother" | "family" | "school" | "efs" | "tutors" | "team" | "personnel";
