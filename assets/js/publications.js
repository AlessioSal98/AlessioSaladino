/* =========================================================
   PUBLICATIONS DATA
   ---------------------------------------------------------
   To add a paper, copy one block below and edit the fields.
   Order doesn't matter: papers are sorted by year (newest first).

   Fields (only id, title, authors, venue, year, type are required):
     id         unique short id, also used as page anchor (#id)
     title      paper title
     authors    list of authors; "Alessio Saladino" is highlighted automatically.
                Append "*" to a name for equal contribution (e.g. "Alessio Saladino*")
     venue      full venue name
     venueShort acronym shown as a badge (e.g. "ICSR")
     year       publication year (number)
     type       "conference" | "journal" | "workshop" | "preprint" | "thesis"
     note       optional extra text (e.g. "Short paper", "Best paper award")
     pdf        path or URL to the PDF
     doi        DOI string, e.g. "10.1007/978-..."   (link is built automatically)
     url        publisher / IRIS page
     code       repository URL
     video      video URL
     thumb      path to a teaser image (optional)
     abstract   abstract text
     bibtex     custom BibTeX (if omitted, one is generated)
   ========================================================= */

const ME = "Alessio Saladino";

const PUBLICATIONS = [
    {
        id: "icsr2025",
        title: "A Cognitive Architecture for Embodied AI based on LLM Common-sense Knowledge",
        authors: ["Alessio Saladino", "Michele Brienza", "Vincenzo Suriani", "Domenico Daniele Bloisi", "Luca Iocchi"],
        venue: "International Conference on Social Robotics (ICSR)",
        venueShort: "ICSR",
        year: 2025,
        type: "conference",
        pdf: "publications/ICSR_2025.pdf",
        video: "https://www.youtube.com/watch?v=-sRd8KjHceA",
        thumb: "images/icsr.png",
        abstract: "The increased performance of LLMs has allowed them to be employed in a wide variety of language-related tasks. In this work, we propose a robot-agnostic Cognitive Architecture for Human-Robot Interaction (HRI) that allows the robot on which it is mounted to reason about its embodiment and the environment around it to decide how to act during interactions with humans. Our architecture includes a long-term memory, which allows the robot to remember past information, and a series of modules called Supervisors. The supervisors role is to orchestrate the interaction process in order to ensure that the robot's behavior does not diverge from the desired one, respecting security criteria that depend on different factors, such as the domain in which the robot is located, the users, and the robot embodiment. To highlight the adaptability of our architecture, we tested it on four different robots, each with a different set of skills. We evaluated this architecture during a dialogue between two robots, NAO and SMARRtino, in which they had to reason about their embodiment and explain to each other what they can do with it."
    },
    {
        id: "ecmr2025",
        title: "A Use Case of Natural Language Programming for Industrial Robots",
        authors: ["Alessio Saladino", "Luca Iocchi", "Vincenzo Agostiniano", "Pieter Saveyn"],
        venue: "European Conference on Mobile Robots (ECMR)",
        venueShort: "ECMR",
        year: 2025,
        type: "conference",
        note: "Short paper",
        pdf: "publications/ECMR_2025.pdf",
        abstract: "Recent advances in Large Language Models (LLMs) have enabled their use in natural language tasks across various domains, including robotics. Recent studies have extensively explored the integration of LLMs with social robots, highlighting how their ability to generate human-like language can lead to more natural, coherent, and effective interactions with people. In industrial settings, combining LLMs and other AI technologies with collaborative or industrial robots can support the development of more intelligent robotic behaviors, ultimately improving task execution efficiency. Previous research has demonstrated that it is possible to integrate LLMs and vision-based LLMs to perform robotic tasks described using natural language. Moreover, LLMs have demonstrated the ability to convert natural language into low-level actions that enable the execution of industrial tasks. LLMs have limitations, such as biased outputs, hallucinations, lack of context, and no persistent memory, making adaptation to specific environments challenging. To address this, the authors previously developed a cognitive architecture using LLMs and common sense knowledge to process semi-structured data via modular components (Supervisors), utilizing prompt engineering. Although this architecture was originally designed for general interaction scenarios, in this work, we aim to explore its integration within an industrial context. Unlike social environments, which require the robot to be capable of handling social behaviors and intents, here the robot is required to understand and execute complex tasks. To achieve its goals, the robot must be capable of understanding the human expert's requirements and feedback expressed in natural language. It must also be capable of reason and understand how to comply with specified constraints and avoid diverging from the human-imposed goal."
    },
    {
        id: "genplan-cosptl",
        title: "CoSP-TL: Common Sense Enhanced Planning under Temporal Logic Constraints with LLMs",
        authors: ["Emanuele Musumeci*", "Alessio Saladino*", "Elena Umili", "Luca Iocchi", "Daniele Nardi"],
        venue: "9th Workshop on Generalization in Planning (GenPlan)",
        venueShort: "GenPlan",
        year: 2026,
        type: "workshop",
        note: "* Equal contribution",
        pdf: "publications/CoSP-TL_GenPlan.pdf",
        url: "https://openreview.net/forum?id=fB5mbQ4KBF",
        code: "https://github.com/EmanueleMusumeci/CoSP-TL",
        thumb: "images/cosptl.png",
        abstract: "In this paper, we present CoSP-TL, a two-level architecture that combines common-sense reasoning knowledge from Large Language Models with formal symbolic planning to address temporally constrained planning problems expressed in natural language. Our approach employs a hierarchical planner composed of a High-Level Planner, which iteratively refines a natural-language plan until it satisfies a linear temporal logic formula over finite traces (LTLf) encoding the problem constraints, and a Low-Level Planner, which translates the high-level plan into executable PDDL with extensive validation and error-recovery mechanisms. We evaluate our framework on the recent and challenging LexiCon benchmark across three IPC domains, Blocksworld, Logistics, and Sokoban, considering an increasing number of temporal constraints over domain fluents. Results show that our approach significantly outperforms standard LLM-based planning, achieving strong performance on unconstrained problems and maintaining robust results as the number of constraints increases, highlighting the scalability of CoSP-TL in handling temporally constrained planning tasks at which standard LLM planners exhibit substantial performance degradation."
    }

    // ---- add new papers here ----
];

/* =========================================================
   RENDERING (no need to edit below)
   ========================================================= */

const TYPE_LABELS = {
    conference: "Conference",
    journal: "Journal",
    workshop: "Workshop",
    preprint: "Preprint",
    thesis: "Thesis"
};

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const cleanName = a => a.replace(/\*+$/, "");

function formatAuthors(authors) {
    return authors
        .map(a => {
            const name = cleanName(a);
            const star = a !== name ? "<sup>*</sup>" : "";
            return (name === ME ? `<span class="me">${escapeHtml(name)}</span>` : escapeHtml(name)) + star;
        })
        .join(", ");
}

function makeBibtex(p) {
    if (p.bibtex) return p.bibtex.trim();
    const entry = p.type === "journal" ? "article" : p.type === "preprint" ? "misc" : "inproceedings";
    const field = p.type === "journal" ? "journal" : "booktitle";
    const lines = [
        `@${entry}{${p.id},`,
        `  title     = {${p.title}},`,
        `  author    = {${p.authors.map(cleanName).join(" and ")}},`,
        `  ${field.padEnd(9)} = {${p.venue}},`,
        `  year      = {${p.year}}`
    ];
    if (p.doi) lines[lines.length - 1] += `,\n  doi       = {${p.doi}}`;
    return lines.join("\n") + "\n}";
}

function renderPub(p, { compact = false } = {}) {
    const links = [];
    if (p.pdf) links.push(`<a class="btn btn-sm" href="${p.pdf}" target="_blank" rel="noopener">PDF</a>`);
    if (p.doi) links.push(`<a class="btn btn-sm" href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI</a>`);
    if (p.url) links.push(`<a class="btn btn-sm" href="${p.url}" target="_blank" rel="noopener">${p.url.includes("openreview.net") ? "OpenReview" : "Publisher"}</a>`);
    if (p.code) links.push(`<a class="btn btn-sm" href="${p.code}" target="_blank" rel="noopener">Code</a>`);
    if (p.video) links.push(`<a class="btn btn-sm" href="${p.video}" target="_blank" rel="noopener">Video</a>`);
    if (!compact) {
        if (p.abstract) links.push(`<button class="btn btn-sm" data-toggle="abs-${p.id}">Abstract</button>`);
        links.push(`<button class="btn btn-sm" data-toggle="bib-${p.id}">BibTeX</button>`);
    }

    const showThumb = p.thumb && !compact;
    const badge = p.venueShort ? `<span class="pub-badge">${escapeHtml(p.venueShort)} ${p.year}</span>` : "";
    const note = p.note ? ` · ${escapeHtml(p.note)}` : "";

    return `
    <article class="pub${showThumb ? "" : " no-thumb"}" id="${p.id}">
        ${showThumb ? `<a href="${p.thumb}" target="_blank" rel="noopener" title="Open full-size figure"><img class="pub-thumb" src="${p.thumb}" alt="Overview figure: ${escapeHtml(p.title)}" loading="lazy"></a>` : ""}
        <div>
            <div class="pub-title">${escapeHtml(p.title)}${badge}</div>
            <div class="pub-authors">${formatAuthors(p.authors)}</div>
            <div class="pub-venue"><em>${escapeHtml(p.venue)}</em>, ${p.year}${note}</div>
            <div class="pub-links">${links.join("")}</div>
            ${compact ? "" : `
            <div class="pub-extra" id="abs-${p.id}" hidden>${escapeHtml(p.abstract || "")}</div>
            <div class="pub-extra" id="bib-${p.id}" hidden>
                <pre>${escapeHtml(makeBibtex(p))}</pre>
                <button class="btn btn-sm" data-copy="bib-${p.id}">Copy BibTeX</button>
            </div>`}
        </div>
    </article>`;
}

function sortedPubs() {
    return [...PUBLICATIONS].sort((a, b) => b.year - a.year);
}

/* Compact list for the home page */
function renderRecentPublications(containerId, n = 3) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = sortedPubs().slice(0, n).map(p => renderPub(p, { compact: true })).join("");
}

/* Full page with search + type filter, grouped by year */
function renderPublicationsPage(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const filtersEl = document.getElementById("pub-filters");
    const searchEl = document.getElementById("pub-search");
    let activeType = "all";

    const types = [...new Set(PUBLICATIONS.map(p => p.type))];
    if (filtersEl && types.length > 1) {
        filtersEl.innerHTML = ["all", ...types].map(t =>
            `<button class="btn btn-sm filter-btn${t === "all" ? " active" : ""}" data-type="${t}">${t === "all" ? "All" : TYPE_LABELS[t] || t}</button>`
        ).join("");
        filtersEl.addEventListener("click", e => {
            const b = e.target.closest("[data-type]");
            if (!b) return;
            activeType = b.dataset.type;
            filtersEl.querySelectorAll(".filter-btn").forEach(x => x.classList.toggle("active", x === b));
            draw();
        });
    }
    if (searchEl) searchEl.addEventListener("input", draw);

    function draw() {
        const q = (searchEl?.value || "").trim().toLowerCase();
        const list = sortedPubs().filter(p =>
            (activeType === "all" || p.type === activeType) &&
            (!q || [p.title, p.venue, p.venueShort, p.authors.join(" "), p.abstract].join(" ").toLowerCase().includes(q))
        );
        if (!list.length) {
            el.innerHTML = `<p class="pub-empty">No publications match your search.</p>`;
            return;
        }
        let html = "", year = null;
        for (const p of list) {
            if (p.year !== year) { year = p.year; html += `<h2 class="pub-year">${year}</h2>`; }
            html += renderPub(p);
        }
        el.innerHTML = html;
    }

    el.addEventListener("click", e => {
        const t = e.target.closest("[data-toggle]");
        if (t) {
            const target = document.getElementById(t.dataset.toggle);
            target.hidden = !target.hidden;
        }
        const c = e.target.closest("[data-copy]");
        if (c) {
            const text = document.querySelector(`#${c.dataset.copy} pre`).textContent;
            navigator.clipboard?.writeText(text).then(() => {
                c.textContent = "Copied!";
                setTimeout(() => (c.textContent = "Copy BibTeX"), 1500);
            });
        }
    });

    draw();

    // Scroll to anchor after rendering (e.g. publications.html#icsr2025)
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}
