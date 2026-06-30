/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

export interface PdfPageConfig {
    route: string;
    fileName: string;
    pageSize?: string;
    noTimeline?: boolean;
}

/** PDF outputs generated from each presentation route. */
const pdfPages = [
    { route: "index.html", fileName: "index.pdf", pageSize: "21cm 29.7cm", noTimeline: true },
    { route: "who-am-i", fileName: "who-am-i.pdf" },
    { route: "my-hobbies", fileName: "my-hobbies.pdf" },
    { route: "my-travels", fileName: "my-travels.pdf" },
    { route: "personality", fileName: "personality.pdf" },
    { route: "skills", fileName: "skills.pdf" },
    { route: "school", fileName: "school.pdf" },
    { route: "career", fileName: "career.pdf" },
    { route: "project", fileName: "project.pdf" },
    { route: "thanks", fileName: "thanks.pdf" },
] satisfies PdfPageConfig[];

export default pdfPages;
