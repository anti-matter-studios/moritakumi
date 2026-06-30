/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

export type SchoolSlideId = "secondeGenerale" | "st2s" | "paces" | "llcer" | "bts" | "licence" | "master";

export interface SchoolMapLocation {
    /** Accessible pin label. */
    title: string;

    /** Locally cached map image, served from public/. */
    imageSrc: string;

    /** Marker latitude. */
    latitude: number;

    /** Marker longitude. */
    longitude: number;

    /** Slippy-map tile zoom used when regenerating the cached PNG. */
    zoom?: number;
}

export const schoolMapLocations = {
    secondeGenerale: {
        title: "Lycée Marc Bloch map location",
        imageSrc: "/images/maps/school-seconde-generale.png",
        latitude: 48.6167906,
        longitude: 7.7665699
    },
    st2s: {
        title: "Lycée Sainte Clotilde map location",
        imageSrc: "/images/maps/school-st2s.png",
        latitude: 48.5874142,
        longitude: 7.771776
    },
    paces: {
        title: "Faculté de Médecine, Université de Strasbourg map location",
        imageSrc: "/images/maps/school-paces.png",
        latitude: 48.576954,
        longitude: 7.7391692
    },
    llcer: {
        title: "Faculté des Langues, Université de Strasbourg map location",
        imageSrc: "/images/maps/school-llcer.png",
        latitude: 48.5781191,
        longitude: 7.7654764
    },
    bts: {
        title: "Institut Européen de Formation, Strasbourg map location",
        imageSrc: "/images/maps/school-bts.png",
        latitude: 48.6134032,
        longitude: 7.717182
    },
    licence: {
        title: "Institut Supérieur des Ressources Humaines, Schiltigheim map location",
        imageSrc: "/images/maps/school-isrh.png",
        latitude: 48.6130123,
        longitude: 7.7125413
    },
    master: {
        title: "Institut Supérieur des Ressources Humaines, Schiltigheim map location",
        imageSrc: "/images/maps/school-isrh.png",
        latitude: 48.6130123,
        longitude: 7.7125413
    }
} satisfies Record<SchoolSlideId, SchoolMapLocation>;
