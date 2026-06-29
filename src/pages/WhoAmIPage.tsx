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
import Slide, { SlideCard, SlideHeader } from "@/components/Slide";
import Timeline from "@/components/Timeline";


export default function WhoAmIPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="who-am-i">{t("who-am-i.slides.whoAmI.navLabel")}</Timeline.Item>
                <Timeline.Item id="how-am-i">{t("who-am-i.slides.howAmI.navLabel")}</Timeline.Item>
                <Timeline.Item id="my-values">{t("who-am-i.slides.myValues.navLabel")}</Timeline.Item>
                <Timeline.Item id="citation">{t("who-am-i.slides.citation.navLabel")}</Timeline.Item>
                <Timeline.Item id="song">{t("who-am-i.slides.song.navLabel")}</Timeline.Item>
                <Timeline.Item id="movie">{t("who-am-i.slides.movie.navLabel")}</Timeline.Item>
                <Timeline.Item id="place">{t("who-am-i.slides.place.navLabel")}</Timeline.Item>
                <Timeline.Item id="colour">{t("who-am-i.slides.colour.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <Slide
                id="who-am-i"
                navLabel={t("who-am-i.slides.whoAmI.navLabel")}
                backgroundImage={{
                    src: "/images/myself.jpg",
                    width: 979,
                    height: 1299,
                    placement: "top-right",
                }}
            >
                <SlideHeader><RichText i18nKey="who-am-i.slides.whoAmI.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.whoAmI.paragraphs" />
            </Slide>

            <Slide id="how-am-i" navLabel={t("who-am-i.slides.howAmI.navLabel")}>
                <SlideHeader><RichText i18nKey="who-am-i.slides.howAmI.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.howAmI.paragraphs" />
            </Slide>

            <Slide id="my-values" navLabel={t("who-am-i.slides.myValues.navLabel")}>
                <SlideHeader><RichText i18nKey="who-am-i.slides.myValues.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.myValues.paragraphs" />
            </Slide>

            <Slide id="citation" navLabel={t("who-am-i.slides.citation.navLabel")}>
                <SlideCard>
                    <p><RichText i18nKey="who-am-i.slides.citation.card" /></p>
                </SlideCard>
                <hr />
                <SlideHeader><RichText i18nKey="who-am-i.slides.citation.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.citation.paragraphs" />
            </Slide>

            <Slide
                id="song"
                navLabel={t("who-am-i.slides.song.navLabel")}
                backgroundImage={{
                    src: "/images/disparate-youth.jpg",
                    width: 689,
                    height: 689,
                    placement: "top-right"
                }}
            >
                <SlideCard footer={<RichText i18nKey="who-am-i.slides.song.footer" />}>
                    <p><RichText i18nKey="who-am-i.slides.song.card" /></p>
                </SlideCard>
                <hr />
                <SlideHeader><RichText i18nKey="who-am-i.slides.song.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.song.paragraphs" />
            </Slide>

            <Slide
                id="movie"
                navLabel={t("who-am-i.slides.movie.navLabel")}
                backgroundImage={{
                    src: "/images/interstellar.jpg",
                    width: 720,
                    height: 1080,
                    placement: "top-left"
                }}
            >
                <SlideCard footer={<RichText i18nKey="who-am-i.slides.movie.footer" />}>
                    <p><RichText i18nKey="who-am-i.slides.movie.card" /></p>
                </SlideCard>
                <hr />
                <SlideHeader><RichText i18nKey="who-am-i.slides.movie.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.movie.paragraphs" />
            </Slide>

            <Slide
                id="place"
                navLabel={t("who-am-i.slides.place.navLabel")}
                backgroundImage={{
                    src: "/images/207.jpg",
                    width: 1535,
                    height: 2048,
                    placement: "bottom-right"
                }}
            >
                <SlideHeader><RichText i18nKey="who-am-i.slides.place.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.place.paragraphs" />
            </Slide>

            <Slide id="colour" navLabel={t("who-am-i.slides.colour.navLabel")} tone="colour-shift">
                <SlideHeader><RichText i18nKey="who-am-i.slides.colour.title" /></SlideHeader>
                <Paragraphs i18nKey="who-am-i.slides.colour.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
