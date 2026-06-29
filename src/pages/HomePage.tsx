/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { Fragment, useLayoutEffect, useRef, type RefObject } from "react";
import { Trans, useTranslation } from "react-i18next";

import PresentationLayout, {
    PresentationDeck
} from "@/components/PresentationLayout";
import QrCode from "@/components/QrCode";
import RichText from "@/components/RichText";
import Slide, { SlideHeader } from "@/components/Slide";
import styles from "./HomePage.module.scss";


const websiteUrl = "https://moritakumi.anti-matter.studio";

declare const CONTENT_PASSWORD: string;

export default function HomePage() {
    const { t } = useTranslation();
    const copyRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<HTMLAnchorElement>(null);
    const qrShadowRef = useRef<HTMLSpanElement>(null);
    const paragraphs = t("home.slides.home.paragraphs", { returnObjects: true });

    useQrShadowLayout(copyRef, qrCodeRef, qrShadowRef);

    return <PresentationLayout>
        <PresentationDeck>
            <Slide id="home" navLabel={t("home.slides.home.navLabel")} fullWidth>
                <SlideHeader small><RichText i18nKey="home.slides.home.title" /></SlideHeader>
                <QrCode
                    ref={qrCodeRef}
                    className={styles.qrCode}
                    value={websiteUrl}
                    label={t("home.slides.home.qrCode.label")}
                >
                    <Trans values={{ password: CONTENT_PASSWORD }} components={{ br: <br /> }}>
                        home.slides.home.qrCode.caption
                    </Trans>
                </QrCode>
                <div ref={copyRef} className={styles.copy}>
                    {isStringArray(paragraphs) && paragraphs.map((paragraph, index) => (
                        <Fragment key={paragraph}>
                            {index === paragraphs.length - 1 && (
                                <span ref={qrShadowRef} className={styles.qrShadow} aria-hidden="true" />
                            )}
                            <p><RichText>{paragraph}</RichText></p>
                        </Fragment>
                    ))}
                </div>
            </Slide>
        </PresentationDeck>
    </PresentationLayout>;
}

function useQrShadowLayout(
    copyRef: RefObject<HTMLElement | null>,
    qrCodeRef: RefObject<HTMLElement | null>,
    qrShadowRef: RefObject<HTMLElement | null>,
) {
    useLayoutEffect(() => {
        const copy = copyRef.current;
        const qrCode = qrCodeRef.current;
        const qrShadow = qrShadowRef.current;

        if (copy === null || qrCode === null || qrShadow === null) {
            return;
        }

        const frame = copy.parentElement;

        if (frame === null) {
            return;
        }

        const updateShadow = () => {
            copy.style.setProperty("--home-qr-shadow-offset", "0px");
            copy.style.setProperty("--home-qr-shadow-width", "0px");
            copy.style.setProperty("--home-qr-shadow-height", "0px");

            const frameRect = frame.getBoundingClientRect();
            const qrRect = qrCode.getBoundingClientRect();
            const shadowRect = qrShadow.getBoundingClientRect();
            const shadowOffset = Math.max(0, qrRect.top - shadowRect.top);
            const shadowWidth = Math.max(0, frameRect.right - qrRect.left);
            const shadowHeight = Math.max(0, frameRect.bottom - qrRect.top);

            copy.style.setProperty("--home-qr-shadow-offset", `${shadowOffset.toString()}px`);
            copy.style.setProperty("--home-qr-shadow-width", `${shadowWidth.toString()}px`);
            copy.style.setProperty("--home-qr-shadow-height", `${shadowHeight.toString()}px`);
        };

        const observer = new ResizeObserver(updateShadow);
        const animationFrame = requestAnimationFrame(updateShadow);

        observer.observe(frame);
        observer.observe(qrCode);
        observer.observe(qrShadow);
        window.addEventListener("resize", updateShadow);

        return () => {
            cancelAnimationFrame(animationFrame);
            observer.disconnect();
            window.removeEventListener("resize", updateShadow);
        };
    }, [copyRef, qrCodeRef, qrShadowRef]);
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}
