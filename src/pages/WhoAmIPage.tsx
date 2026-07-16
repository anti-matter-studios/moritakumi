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
import { ResponsiveSlide, SlideCard, SlideHeader } from "@/components/Slide";
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
            <ResponsiveSlide
                id="who-am-i"
                navLabel={t("who-am-i.slides.whoAmI.navLabel")}
                paragraphsI18nKey="who-am-i.slides.whoAmI.paragraphs"
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.whoAmI.title" /></SlideHeader>}
                backgroundImage={{
                    src: "/images/myself.jpg",
                    width: 979,
                    height: 1299,
                    placement: "top-right",
                }}
            />

            <ResponsiveSlide
                id="how-am-i"
                navLabel={t("who-am-i.slides.howAmI.navLabel")}
                paragraphsI18nKey="who-am-i.slides.howAmI.paragraphs"
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.howAmI.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="my-values"
                navLabel={t("who-am-i.slides.myValues.navLabel")}
                paragraphsI18nKey="who-am-i.slides.myValues.paragraphs"
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.myValues.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="citation"
                navLabel={t("who-am-i.slides.citation.navLabel")}
                paragraphsI18nKey="who-am-i.slides.citation.paragraphs"
                leadContent={<>
                    <SlideCard>
                    <p><RichText i18nKey="who-am-i.slides.citation.card" /></p>
                    </SlideCard>
                    <hr />
                </>}
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.citation.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="song"
                navLabel={t("who-am-i.slides.song.navLabel")}
                paragraphsI18nKey="who-am-i.slides.song.paragraphs"
                leadContent={<>
                    <SlideCard footer={<RichText i18nKey="who-am-i.slides.song.footer" />}>
                        <p><RichText i18nKey="who-am-i.slides.song.card" /></p>
                    </SlideCard>
                    <hr />
                </>}
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.song.title" /></SlideHeader>}
                backgroundImage={{
                    src: "/images/disparate-youth.jpg",
                    width: 689,
                    height: 689,
                    placement: "top-right"
                }}
            />

            <ResponsiveSlide
                id="movie"
                navLabel={t("who-am-i.slides.movie.navLabel")}
                paragraphsI18nKey="who-am-i.slides.movie.paragraphs"
                leadContent={<>
                    <SlideCard footer={<RichText i18nKey="who-am-i.slides.movie.footer" />}>
                        <p><RichText i18nKey="who-am-i.slides.movie.card" /></p>
                    </SlideCard>
                    <hr />
                </>}
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.movie.title" /></SlideHeader>}
                backgroundImage={{
                    src: "/images/interstellar.jpg",
                    width: 720,
                    height: 1080,
                    placement: "top-left"
                }}
            />

            <ResponsiveSlide
                id="place"
                navLabel={t("who-am-i.slides.place.navLabel")}
                paragraphsI18nKey="who-am-i.slides.place.paragraphs"
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.place.title" /></SlideHeader>}
                backgroundImage={{
                    src: "/images/207.jpg",
                    width: 1535,
                    height: 2048,
                    placement: "bottom-right"
                }}
            />

            <ResponsiveSlide
                id="colour"
                navLabel={t("who-am-i.slides.colour.navLabel")}
                paragraphsI18nKey="who-am-i.slides.colour.paragraphs"
                header={<SlideHeader><RichText i18nKey="who-am-i.slides.colour.title" /></SlideHeader>}
                tone="colour-shift"
            />
        </PresentationDeck>
    </PresentationLayout>;
}
