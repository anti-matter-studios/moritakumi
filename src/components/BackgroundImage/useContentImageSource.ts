/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { useEffect, useState } from "react";

import { contentIsEncrypted, getContentImageSource } from "@/content";

/** Resolves a public image path to a decrypted object URL when content is encrypted. */
export default function useContentImageSource(publicPath: string) {
    const [source, setSource] = useState<string | undefined>(() => (
        contentIsEncrypted() ? undefined : publicPath
    ));

    useEffect(() => {
        let isMounted = true;

        setSource(contentIsEncrypted() ? undefined : publicPath);
        void getContentImageSource(publicPath)
            .then((nextSource) => {
                if (isMounted) {
                    setSource(nextSource);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [publicPath]);

    return source;
}
