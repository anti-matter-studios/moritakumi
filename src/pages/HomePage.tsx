/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useTranslation } from "react-i18next";

import Paragraphs from "@/components/Paragraphs";
import PresentationLayout, {
    PresentationDeck
} from "@/components/PresentationLayout";
import RichText from "@/components/RichText";
import Slide, { SlideHeader } from "@/components/Slide";


export default function HomePage() {
    const { t } = useTranslation();

    return <PresentationLayout>
        <PresentationDeck>
            <Slide id="home" navLabel={t("home.slides.home.navLabel")}>
                <SlideHeader small><RichText i18nKey="home.slides.home.title" /></SlideHeader>
                <Paragraphs i18nKey="home.slides.home.paragraphs" />
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}
