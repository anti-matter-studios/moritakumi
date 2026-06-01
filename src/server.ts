/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

import { serve } from "bun";
import index from "@/app/index.html";
import debug from "debug";

const logger = debug("moritakumi:server");

logger("Starting the server on port 10201...");
serve({ port: 10201, routes: { "/": index, }, development: true, });
logger("Server listening");
