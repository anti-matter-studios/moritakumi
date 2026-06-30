/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { randomCharacters } from "./textReplacementCharacters";

export function shuffleSourceLetters(sourceLetters: readonly string[]) {
    const pool = sourceLetters.filter((letter) => letter !== " ");

    return sourceLetters
        .map((letter) => {
            if (letter === " " || pool.length === 0) {
                return letter;
            }

            const index = Math.floor(Math.random() * pool.length);
            const [nextLetter] = pool.splice(index, 1);

            return nextLetter;
        })
        .join("");
}

export function createReplacementFrame(
    sourceLetters: string[],
    targetLetters: string[],
    revealedCount: number,
    revealOrder: number[],
    characterSet: readonly string[] = randomCharacters,
) {
    const frameLength = Math.max(sourceLetters.length, targetLetters.length);
    const shuffledLetters = Array.from(shuffleSourceLetters(characterSet));
    const revealedIndexes = new Set(revealOrder.slice(0, revealedCount));

    return Array.from({ length: frameLength }, (_letter, index) => {
        if (revealedIndexes.has(index)) {
            return targetLetters[index] ?? "";
        }

        return shuffledLetters[index % shuffledLetters.length] ?? "";
    }).join("").trimEnd();
}

export function createRandomOrder(length: number) {
    const order = Array.from({ length }, (_item, index) => index);

    for (let index = order.length - 1; index > 0; index -= 1) {
        const nextIndex = Math.floor(Math.random() * (index + 1));
        [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
    }

    return order;
}
