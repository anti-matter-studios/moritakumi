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


export default function SchoolPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="secondeGenerale">{t("school.slides.secondeGenerale.navLabel")}</Timeline.Item>
                <Timeline.Item id="st2s">{t("school.slides.st2s.navLabel")}</Timeline.Item>
                <Timeline.Item id="paces">{t("school.slides.paces.navLabel")}</Timeline.Item>
                <Timeline.Item id="llcer">{t("school.slides.llcer.navLabel")}</Timeline.Item>
                <Timeline.Item id="bts">{t("school.slides.bts.navLabel")}</Timeline.Item>
                <Timeline.Item id="licence">{t("school.slides.licence.navLabel")}</Timeline.Item>
                <Timeline.Item id="master">{t("school.slides.master.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <Slide id="secondeGenerale" navLabel={t("school.slides.secondeGenerale.navLabel")}>
                <SlideHeader eyebrow={t("school.slides.secondeGenerale.eyebrow")} small>
                    <RichText i18nKey="school.slides.secondeGenerale.title" />
                </SlideHeader>
                <Paragraphs i18nKey="school.slides.secondeGenerale.paragraphs" />
            </Slide>

            <Slide id="st2s" navLabel={t("school.slides.st2s.navLabel")}>
                <SlideHeader eyebrow={t("school.slides.st2s.eyebrow")} small>
                    <RichText i18nKey="school.slides.st2s.title" />
                </SlideHeader>
                <Paragraphs i18nKey="school.slides.st2s.paragraphs" />
            </Slide>

            <Slide id="paces" navLabel={t("school.slides.paces.navLabel")}>
                <SlideHeader eyebrow={t("school.slides.paces.eyebrow")} small>
                    <RichText i18nKey="school.slides.paces.title" />
                </SlideHeader>
                <Paragraphs i18nKey="school.slides.paces.paragraphs" />
            </Slide>

            <Slide id="llcer" navLabel={t("school.slides.llcer.navLabel")}>
                <SlideHeader eyebrow={t("school.slides.llcer.eyebrow")} small>
                    <RichText i18nKey="school.slides.llcer.title" />
                </SlideHeader>
                <Paragraphs i18nKey="school.slides.llcer.paragraphs" />
            </Slide>

            <Slide id="bts" navLabel={t("school.slides.bts.navLabel")}>
                <SlideHeader eyebrow={t("school.slides.bts.eyebrow")} small>
                    <RichText i18nKey="school.slides.bts.title" />
                </SlideHeader>
                <Paragraphs i18nKey="school.slides.bts.paragraphs" />
            </Slide>

            <Slide id="licence" navLabel={t("school.slides.licence.navLabel")}>
                <SlideHeader eyebrow={t("school.slides.licence.eyebrow")} small>
                    <RichText i18nKey="school.slides.licence.title" />
                </SlideHeader>
                <Paragraphs i18nKey="school.slides.licence.paragraphs" />
            </Slide>

            <Slide id="master" navLabel={t("school.slides.master.navLabel")}>
                <SlideHeader eyebrow={t("school.slides.master.eyebrow")} small>
                    <RichText i18nKey="school.slides.master.title" />
                </SlideHeader>
                <Paragraphs i18nKey="school.slides.master.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
