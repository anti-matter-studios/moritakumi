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
            <Slide
                id="brother"
                navLabel={t("thanks.slides.brother.navLabel")}
                backgroundImage={{
                    src: "/images/my-brother.jpg",
                    width: 1299,
                    height: 982,
                    placement: "top-right"
                }}
            >
                <SlideHeader><RichText i18nKey="thanks.slides.brother.title" /></SlideHeader>
                <Paragraphs i18nKey="thanks.slides.brother.paragraphs" />
            </Slide>

            <Slide id="family" navLabel={t("thanks.slides.family.navLabel")}>
                <SlideHeader><RichText i18nKey="thanks.slides.family.title" /></SlideHeader>
                <Paragraphs i18nKey="thanks.slides.family.paragraphs" />
            </Slide>

            <Slide id="school" navLabel={t("thanks.slides.school.navLabel")}>
                <SlideHeader><RichText i18nKey="thanks.slides.school.title" /></SlideHeader>
                <Paragraphs i18nKey="thanks.slides.school.paragraphs" />
            </Slide>

            <Slide
                id="efs"
                navLabel={t("thanks.slides.efs.navLabel")}
                backgroundImage={{
                    src: "/images/efs.png",
                    width: 300,
                    height: 300,
                    placement: "top-right"
                }}
            >
                <SlideHeader><RichText i18nKey="thanks.slides.efs.title" /></SlideHeader>
                <Paragraphs i18nKey="thanks.slides.efs.paragraphs" />
            </Slide>

            <Slide id="tutors" navLabel={t("thanks.slides.tutors.navLabel")}>
                <SlideHeader><RichText i18nKey="thanks.slides.tutors.title" /></SlideHeader>
                <Paragraphs i18nKey="thanks.slides.tutors.paragraphs" />
            </Slide>

            <Slide id="team" navLabel={t("thanks.slides.team.navLabel")}>
                <SlideHeader><RichText i18nKey="thanks.slides.team.title" /></SlideHeader>
                <Paragraphs i18nKey="thanks.slides.team.paragraphs" />
            </Slide>

            <Slide id="personnel" navLabel={t("thanks.slides.personnel.navLabel")}>
                <SlideHeader><RichText i18nKey="thanks.slides.personnel.title" /></SlideHeader>
                <Paragraphs i18nKey="thanks.slides.personnel.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
