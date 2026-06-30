/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { contentPasswordEnvName } from "./constants";

/** Reads the content password without ever echoing it to output. */
export function readContentPassword() {
    const password = process.env[contentPasswordEnvName];

    if (password === undefined || password.length === 0) {
        throw new Error(`Set ${contentPasswordEnvName} before running this command.`);
    }

    return password;
}
