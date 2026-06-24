/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import Paragraphs from "@/components/Paragraphs";
import PresentationLayout, {
    PresentationDeck,
    PresentationTimeline,
} from "@/components/PresentationLayout";
import RichText from "@/components/RichText";
import Slide, { SlideHeader } from "@/components/Slide";
import Timeline from "@/components/Timeline";
import { PlaceCards } from "./pageHelpers";


export default function MyTravelsPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="title">{t("my-travels.slides.title.navLabel")}</Timeline.Item>
                <Timeline.Item id="italy">{t("my-travels.slides.italy.navLabel")}</Timeline.Item>
                <Timeline.Item id="japan">{t("my-travels.slides.japan.navLabel")}</Timeline.Item>
                <Timeline.Item id="london">{t("my-travels.slides.london.navLabel")}</Timeline.Item>
                <Timeline.Item id="spain">{t("my-travels.slides.spain.navLabel")}</Timeline.Item>
                <Timeline.Item id="saint-marten">{t("my-travels.slides.saintMarten.navLabel")}</Timeline.Item>
                <Timeline.Item id="north-america">{t("my-travels.slides.northAmerica.navLabel")}</Timeline.Item>
                <Timeline.Item id="peru">{t("my-travels.slides.peru.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <Slide id="title" navLabel={t("my-travels.slides.title.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.title.title" /></SlideHeader>
                <Paragraphs i18nKey="my-travels.slides.title.paragraphs" />
            </Slide>

            <Slide id="italy" navLabel={t("my-travels.slides.italy.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.italy.title" /></SlideHeader>
                <PlaceCards i18nKey="my-travels.slides.italy.places" />
                <Paragraphs i18nKey="my-travels.slides.italy.paragraphs" />
            </Slide>

            <Slide id="japan" navLabel={t("my-travels.slides.japan.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.japan.title" /></SlideHeader>
                <PlaceCards i18nKey="my-travels.slides.japan.places" />
                <Paragraphs i18nKey="my-travels.slides.japan.paragraphs" />
            </Slide>

            <Slide id="london" navLabel={t("my-travels.slides.london.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.london.title" /></SlideHeader>
                <PlaceCards i18nKey="my-travels.slides.london.places" />
                <Paragraphs i18nKey="my-travels.slides.london.paragraphs" />
            </Slide>

            <Slide id="spain" navLabel={t("my-travels.slides.spain.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.spain.title" /></SlideHeader>
                <PlaceCards i18nKey="my-travels.slides.spain.places" />
                <Paragraphs i18nKey="my-travels.slides.spain.paragraphs" />
            </Slide>

            <Slide id="saint-marten" navLabel={t("my-travels.slides.saintMarten.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.saintMarten.title" /></SlideHeader>
                <PlaceCards i18nKey="my-travels.slides.saintMarten.places" />
                <Paragraphs i18nKey="my-travels.slides.saintMarten.paragraphs" />
            </Slide>

            <Slide id="north-america" navLabel={t("my-travels.slides.northAmerica.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.northAmerica.title" /></SlideHeader>
                <PlaceCards i18nKey="my-travels.slides.northAmerica.places" />
                <Paragraphs i18nKey="my-travels.slides.northAmerica.paragraphs" />
            </Slide>

            <Slide id="peru" navLabel={t("my-travels.slides.peru.navLabel")}>
                <SlideHeader><RichText i18nKey="my-travels.slides.peru.title" /></SlideHeader>
                <PlaceCards i18nKey="my-travels.slides.peru.places" />
                <Paragraphs i18nKey="my-travels.slides.peru.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
