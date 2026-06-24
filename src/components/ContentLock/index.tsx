/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { type SubmitEvent, type PropsWithChildren, useEffect, useState } from "react";

import {
    initializeTranslations,
    initializeTranslationsWithPassword,
    initializeTranslationsWithStoredKey,
    translationsAreEncrypted,
} from "@/i18n";
import styles from "./index.module.scss";

const storedContentKeyName = "moritakumi.contentKey";

/** Unlocks encrypted site content before rendering translated pages. */
export default function ContentLock({ children }: ContentLockProps) {
    const isEncrypted = translationsAreEncrypted();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEncrypted) {
            void initializeTranslations().then(() => {
                setIsUnlocked(true);
            });
            return;
        }

        const storedContentKey = readStoredContentKey();

        if (storedContentKey === undefined) {
            return;
        }

        setIsUnlocking(true);
        void initializeTranslationsWithStoredKey(storedContentKey)
            .then(() => {
                setIsUnlocked(true);
            })
            .catch(() => {
                clearStoredContentKey();
            })
            .finally(() => {
                setIsUnlocking(false);
            });
    }, [isEncrypted]);

    async function unlock(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsUnlocking(true);
        setError("");

        try {
            const contentKey = await initializeTranslationsWithPassword(password);

            if (contentKey !== undefined) {
                writeStoredContentKey(contentKey);
            }

            setIsUnlocked(true);
        } catch {
            clearStoredContentKey();
            setError("That password did not unlock the content.");
        } finally {
            setIsUnlocking(false);
        }
    }

    if (isUnlocked) {
        return children;
    }

    if (!isEncrypted) {
        return null;
    }

    return <main className={styles.lock}>
        <section className={styles.panel} aria-labelledby="content-lock-title">
            <h1 className={styles.title} id="content-lock-title">Locked content</h1>
            <p className={styles.message}>
                Enter the password to decrypt and view this presentation.
            </p>
            <form className={styles.form} onSubmit={event => { void unlock(event); }}>
                <label className={styles.label}>
                    Password
                    <input
                        autoComplete="current-password"
                        autoFocus
                        className={styles.input}
                        disabled={isUnlocking}
                        onChange={(event) => { setPassword(event.target.value); }}
                        type="password"
                        value={password}
                    />
                </label>
                <button className={styles.button} disabled={isUnlocking || password.length === 0}>
                    {isUnlocking ? "Unlocking" : "Unlock"}
                </button>
                <p className={styles.error} aria-live="polite">{error}</p>
            </form>
        </section>
    </main>;
}

type ContentLockProps = PropsWithChildren;

function readStoredContentKey() {
    try {
        return window.localStorage.getItem(storedContentKeyName) ?? undefined;
    } catch {
        return undefined;
    }
}

function writeStoredContentKey(contentKey: string) {
    try {
        window.localStorage.setItem(storedContentKeyName, contentKey);
    } catch {
        // Some browsing modes disable localStorage; unlocking still works for this session.
    }
}

function clearStoredContentKey() {
    try {
        window.localStorage.removeItem(storedContentKeyName);
    } catch {
        // Ignore storage access failures.
    }
}
