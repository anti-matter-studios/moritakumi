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


export default function MyHobbiesPage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationTimeline>
            <Timeline>
                <Timeline.Item id="horseback-riding">{t("my-hobbies.slides.horsebackRiding.navLabel")}</Timeline.Item>
                <Timeline.Item id="winter-sports">{t("my-hobbies.slides.winterSports.navLabel")}</Timeline.Item>
                <Timeline.Item id="womens-rights">{t("my-hobbies.slides.womensRights.navLabel")}</Timeline.Item>
                <Timeline.Item id="blood-donation">{t("my-hobbies.slides.bloodDonation.navLabel")}</Timeline.Item>
            </Timeline>
        </PresentationTimeline>

        <PresentationDeck>
            <Slide
                id="horseback-riding"
                navLabel={t("my-hobbies.slides.horsebackRiding.navLabel")}
                backgroundImage={{
                    src: "/images/horseback-riding.jpg",
                    width: 960,
                    height: 940,
                    placement: "top-right"
                }}
            >
                <SlideHeader><RichText i18nKey="my-hobbies.slides.horsebackRiding.title" /></SlideHeader>
                <Paragraphs i18nKey="my-hobbies.slides.horsebackRiding.paragraphs" />
            </Slide>

            <Slide
                id="winter-sports"
                navLabel={t("my-hobbies.slides.winterSports.navLabel")}
                backgroundImage={{
                    src: "/images/ski.jpg",
                    width: 1535,
                    height: 2048,
                    placement: "bottom-left"
                }}
            >
                <SlideHeader><RichText i18nKey="my-hobbies.slides.winterSports.title" /></SlideHeader>
                <Paragraphs i18nKey="my-hobbies.slides.winterSports.paragraphs" />
            </Slide>

            <Slide
                id="womens-rights"
                navLabel={t("my-hobbies.slides.womensRights.navLabel")}
                backgroundImage={{
                    src: "/images/awid.jpg",
                    width: 1428,
                    height: 1101,
                    placement: "bottom-right"
                }}
            >
                <SlideHeader><RichText i18nKey="my-hobbies.slides.womensRights.title" /></SlideHeader>
                <Paragraphs i18nKey="my-hobbies.slides.womensRights.paragraphs" />
            </Slide>

            <Slide
                id="blood-donation"
                navLabel={t("my-hobbies.slides.bloodDonation.navLabel")}
                backgroundImage={{
                    src: "/images/efs-don.jpg",
                    width: 2048,
                    height: 1534,
                    placement: "bottom-left"
                }}
            >
                <SlideHeader><RichText i18nKey="my-hobbies.slides.bloodDonation.title" /></SlideHeader>
                <Paragraphs
                    i18nKey="my-hobbies.slides.bloodDonation.paragraphs"
                    components={{
                        efs: <a href="https://dondesang.efs.sante.fr" />,
                    }}
                />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
