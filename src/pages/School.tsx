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
import {
    schoolMapLocations,
    type SchoolSlideId
} from "./schoolMapLocations";


const schoolMapSize = {
    width: 760,
    height: 460
} as const;

const schoolBackgroundImages = {
    secondeGenerale: {
        ...schoolMapSize,
        placement: "bottom-right",
        map: schoolMapLocations.secondeGenerale
    },
    st2s: {
        ...schoolMapSize,
        placement: "bottom-left",
        map: schoolMapLocations.st2s
    },
    paces: {
        ...schoolMapSize,
        placement: "bottom-right",
        map: schoolMapLocations.paces
    },
    llcer: {
        ...schoolMapSize,
        placement: "bottom-left",
        map: schoolMapLocations.llcer
    },
    bts: {
        ...schoolMapSize,
        placement: "bottom-right",
        map: schoolMapLocations.bts
    },
    licence: {
        ...schoolMapSize,
        placement: "bottom-left",
        map: schoolMapLocations.licence
    },
    master: {
        ...schoolMapSize,
        placement: "bottom-right",
        map: schoolMapLocations.master
    }
} satisfies Record<SchoolSlideId, BackgroundImageProps>;

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
            <SchoolSlide slideKey="secondeGenerale" />
            <SchoolSlide slideKey="st2s" />
            <SchoolSlide slideKey="paces" />
            <SchoolSlide slideKey="llcer" />
            <SchoolSlide slideKey="bts" />
            <SchoolSlide slideKey="licence" />
            <SchoolSlide slideKey="master" />
        </PresentationDeck>
    </PresentationLayout>;
}

function SchoolSlide({ slideKey }: { slideKey: SchoolSlideId }) {
    const { t } = useTranslation();

    return <ResponsiveSlide
        id={slideKey}
        navLabel={t(`school.slides.${slideKey}.navLabel`)}
        paragraphsI18nKey={`school.slides.${slideKey}.paragraphs`}
        header={
            <SlideHeader eyebrow={t(`school.slides.${slideKey}.eyebrow`)} small>
                <RichText i18nKey={`school.slides.${slideKey}.title`} />
            </SlideHeader>
        }
        backgroundImage={schoolBackgroundImages[slideKey]}
    />;
}
