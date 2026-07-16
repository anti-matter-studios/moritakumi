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
            <ResponsiveSlide
                id="title"
                navLabel={t("my-travels.slides.title.navLabel")}
                paragraphsI18nKey="my-travels.slides.title.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.title.title" /></SlideHeader>}
            />

            <ResponsiveSlide
                id="italy"
                navLabel={t("my-travels.slides.italy.navLabel")}
                paragraphsI18nKey="my-travels.slides.italy.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.italy.title" /></SlideHeader>}
                supportingContent={<PlaceCards i18nKey="my-travels.slides.italy.places" />}
                backgroundImage={{
                    src: "/images/roma.jpg",
                    width: 1199,
                    height: 1600,
                    placement: "top-left",
                }}
            />

            <ResponsiveSlide
                id="japan"
                navLabel={t("my-travels.slides.japan.navLabel")}
                paragraphsI18nKey="my-travels.slides.japan.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.japan.title" /></SlideHeader>}
                supportingContent={<PlaceCards i18nKey="my-travels.slides.japan.places" />}
                backgroundImage={{
                    src: "/images/tokyo.jpg",
                    width: 1048,
                    height: 785,
                    placement: "top-right",
                }}
            />

            <ResponsiveSlide
                id="london"
                navLabel={t("my-travels.slides.london.navLabel")}
                paragraphsI18nKey="my-travels.slides.london.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.london.title" /></SlideHeader>}
                supportingContent={<PlaceCards i18nKey="my-travels.slides.london.places" />}
                backgroundImage={{
                    src: "/images/london.jpg",
                    width: 1488,
                    height: 1085,
                    placement: "top-left",
                }}
            />

            <ResponsiveSlide
                id="spain"
                navLabel={t("my-travels.slides.spain.navLabel")}
                paragraphsI18nKey="my-travels.slides.spain.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.spain.title" /></SlideHeader>}
                supportingContent={<PlaceCards i18nKey="my-travels.slides.spain.places" />}
                backgroundImage={{
                    src: "/images/madrid.jpg",
                    width: 1152,
                    height: 2048,
                    placement: "top-right",
                }}
            />

            <ResponsiveSlide
                id="saint-marten"
                navLabel={t("my-travels.slides.saintMarten.navLabel")}
                paragraphsI18nKey="my-travels.slides.saintMarten.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.saintMarten.title" /></SlideHeader>}
                supportingContent={<PlaceCards i18nKey="my-travels.slides.saintMarten.places" />}
                backgroundImage={{
                    src: "/images/saint-martin.jpg",
                    width: 2048,
                    height: 1533,
                    placement: "bottom-left",
                }}
            />

            <ResponsiveSlide
                id="north-america"
                navLabel={t("my-travels.slides.northAmerica.navLabel")}
                paragraphsI18nKey="my-travels.slides.northAmerica.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.northAmerica.title" /></SlideHeader>}
                supportingContent={<PlaceCards i18nKey="my-travels.slides.northAmerica.places" />}
                backgroundImage={{
                    src: "/images/new-york.jpg",
                    width: 2048,
                    height: 1534,
                    placement: "top-right",
                }}
            />

            <ResponsiveSlide
                id="peru"
                navLabel={t("my-travels.slides.peru.navLabel")}
                paragraphsI18nKey="my-travels.slides.peru.paragraphs"
                header={<SlideHeader><RichText i18nKey="my-travels.slides.peru.title" /></SlideHeader>}
                supportingContent={<PlaceCards i18nKey="my-travels.slides.peru.places" />}
                backgroundImage={{
                    src: "/images/peru.jpg",
                    width: 902,
                    height: 1346,
                    placement: "top-left",
                }}
            />
        </PresentationDeck>
    </PresentationLayout>;
}
