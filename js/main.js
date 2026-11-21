/* ============================================================================
   main.js: fills the page from data.js and handles the few interactive bits
   (the project list, related-project links, and the photo viewer).
   ========================================================================== */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const FIGS = window.FIGURES || {};
  const $ = (s, r = document) => r.querySelector(s);
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- text helpers ---------- */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // data.js is written with straight quotes; print typographer's quotes instead.
  const smart = s => String(s == null ? "" : s)
    .replace(/(^|[\s(\[{—–-])"(?=\S)/g, "$1“").replace(/"/g, "”")
    .replace(/(^|[\s(\[{—–-])'(?=\S)/g, "$1‘").replace(/'/g, "’")
    .replace(/\.\.\./g, "…");

  // B612 Mono's curly apostrophe looks like an accent, so text set in mono keeps
  // straight typewriter quotes.
  const straight = s => String(s == null ? "" : s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

  const t = s => esc(smart(s));     // serif text
  const m = s => esc(straight(s));  // mono text
  const byId = Object.fromEntries(D.projects.map(p => [p.id, p]));
  const domain = id => (D.domains.find(d => d.id === id) || { label: id }).label;

  const P = D.profile;

  /* ---------- hero ---------- */
  $("#headline").textContent = smart(P.headline);
  $("#intro").textContent = smart(P.blurb);
  document.querySelectorAll("[data-email]").forEach(a => {
    a.href = "mailto:" + P.email;
    if (a.hasAttribute("data-email-text")) a.textContent = P.email;
  });

  /* ---------- shared bits ---------- */
  const points = list => (list && list.length)
    ? `<ul class="points">${list.map(h => `<li>${t(h)}</li>`).join("")}</ul>` : "";

  const relatedLinks = p => (p.related || [])
    .filter(id => byId[id])
    .map(id => `<a href="#p-${esc(id)}">${m(byId[id].title)}</a>`)
    .join(", ");

  const extLinks = p => (p.links && p.links.length)
    ? `<p class="ext-links">${p.links.map(l =>
        `<a href="${esc(l.href)}" target="_blank" rel="noopener">${m(l.label)}<span aria-hidden="true">&nbsp;↗</span></a>`).join("")}</p>`
    : "";

  /* ---------- selected work ---------- */
  (function work() {
    let n = 0;
    $("#entries").innerHTML = D.projects.filter(p => p.featured).map(p => {
      const fig = FIGS[p.id];
      if (fig) n += 1;
      const rel = relatedLinks(p);
      return `
      <article class="entry" id="p-${esc(p.id)}">
        <header class="entry-head">
          <h3 class="entry-title">${t(p.title)}</h3>
          <p class="entry-tag">${m(p.tagline)}</p>
          <dl class="spec">
            <div><dt>Type</dt><dd>${m(domain(p.domain))}</dd></div>
            <div><dt>Status</dt><dd>${m(p.status)}</dd></div>
            <div><dt>Year</dt><dd>${m(p.year)}</dd></div>
            ${rel ? `<div><dt>See also</dt><dd>${rel}</dd></div>` : ""}
          </dl>
        </header>
        <div class="entry-body">
          <p class="entry-blurb">${t(p.blurb)}</p>
          ${points(p.highlights)}
          <p class="stack"><span class="sr-only">Built with </span>${(p.stack || []).map(m).join("\u00a0· ")}</p>
          ${extLinks(p)}
        </div>
        ${fig ? `
        <figure class="fig">
          <div class="fig-plate">${fig.svg}</div>
          <figcaption><b>Fig.&nbsp;${n}</b> ${m(fig.caption)}</figcaption>
        </figure>` : ""}
      </article>`;
    }).join("");
  })();

  /* ---------- everything else ---------- */
  (function index() {
    const rest = D.projects.filter(p => !p.featured);
    $("#groups").innerHTML = D.domains.map(d => {
      const items = rest.filter(p => p.domain === d.id);
      if (!items.length) return "";
      return `
      <section class="group" aria-labelledby="g-${esc(d.id)}">
        <header class="group-head">
          <h4 class="group-name" id="g-${esc(d.id)}">${t(d.label)}</h4>
          <p class="group-blurb">${t(d.blurb)}</p>
        </header>
        <div class="rows">
          ${items.map(p => {
            const rel = relatedLinks(p);
            return `
          <details class="row" id="p-${esc(p.id)}">
            <summary>
              <span class="row-title">${t(p.title)}</span>
              <span class="row-tag">${m(p.tagline)}</span>
              <span class="row-status">${m(p.status)}</span>
              <span class="row-toggle" aria-hidden="true"></span>
            </summary>
            <div class="row-body">
              <div>
                <p>${t(p.blurb)}</p>
                ${points(p.highlights)}
                ${extLinks(p)}
              </div>
              <dl class="spec">
                <div><dt>Stack</dt><dd>${(p.stack || []).map(m).join("\u00a0· ")}</dd></div>
                <div><dt>Year</dt><dd>${m(p.year)}</dd></div>
                ${rel ? `<div><dt>See also</dt><dd>${rel}</dd></div>` : ""}
              </dl>
            </div>
          </details>`;
          }).join("")}
        </div>
      </section>`;
    }).join("");
  })();

  /* Links to a project (#p-…) open its row if it's folded away. */
  function reveal(hash, smooth) {
    if (!/^#p-[\w-]+$/.test(hash)) return false;
    const el = document.getElementById(hash.slice(1));
    if (!el) return false;
    if (el.tagName === "DETAILS") el.open = true;
    el.scrollIntoView({ behavior: smooth && !REDUCED ? "smooth" : "auto", block: "start" });
    const focusTarget = el.tagName === "DETAILS" ? el.querySelector("summary") : el.querySelector("h3");
    if (focusTarget) {
      if (!focusTarget.hasAttribute("tabindex") && focusTarget.tagName !== "SUMMARY") focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
    }
    return true;
  }
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#p-"]');
    if (!a) return;
    if (reveal(a.getAttribute("href"), true)) {
      e.preventDefault();
      history.pushState(null, "", a.getAttribute("href"));
    }
  });
  window.addEventListener("hashchange", () => reveal(location.hash, false));
  if (location.hash) reveal(location.hash, false);

  /* ---------- photos ---------- */
  const PH = D.photography;
  const shots = PH.shots || [];
  $("#photoIntro").textContent = smart(PH.intro);
  $("#photoNote").textContent = smart(PH.note);
  $("#gear").innerHTML = PH.gear.map(g =>
    `<div><dt>${m(g.name)}</dt><dd>${m(g.note)}</dd></div>`).join("");

  $("#sheet").innerHTML = shots.map((s, i) => `
    <figure class="shot${i === 0 ? " shot--lead" : ""}">
      <a href="${esc(s.src)}" data-i="${i}" aria-label="${t(s.caption)}, open larger">
        <img src="${esc(s.src)}" alt="${t(s.alt || s.caption)}" ${i === 0 ? "" : 'loading="lazy"'} decoding="async">
      </a>
      <figcaption><span class="n">${String(i + 1).padStart(2, "0")}</span>${m(s.caption)}</figcaption>
    </figure>`).join("");

  (function viewer() {
    const dlg = $("#viewer");
    if (!dlg || typeof dlg.showModal !== "function" || !shots.length) return; // links still open the image
    const img = $("#viewerImg"), cap = $("#viewerCap"), count = $("#viewerCount");
    let i = 0;

    function show(n) {
      i = (n + shots.length) % shots.length;
      const s = shots[i];
      img.src = s.src;
      img.alt = smart(s.alt || s.caption);
      cap.textContent = straight(s.caption);
      count.textContent = `${i + 1} / ${shots.length}`;
      [i + 1, i - 1].forEach(k => { new Image().src = shots[(k + shots.length) % shots.length].src; });
    }

    $("#sheet").addEventListener("click", e => {
      const a = e.target.closest("a[data-i]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      show(+a.dataset.i);
      dlg.showModal();
    });
    dlg.addEventListener("click", e => {
      const step = e.target.closest("[data-step]");
      if (step) return show(i + +step.dataset.step);
      if (e.target.closest("[data-close]") || e.target === dlg || e.target.classList.contains("viewer-stage")) dlg.close();
    });
    dlg.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") { e.preventDefault(); show(i + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(i - 1); }
    });

    // Swipe on touch screens.
    let x0 = null;
    dlg.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  })();

  /* ---------- about ---------- */
  $("#bio").innerHTML = P.bio.map(b => `<p>${t(b)}</p>`).join("");
  $("#facts").innerHTML = P.facts.map(f =>
    `<div><dt>${m(f.k)}</dt><dd>${t(f.v)}</dd></div>`).join("");
  $("#tools").innerHTML = D.skills.map(g => `
    <div class="tool-group">
      <h4>${m(g.group)}</h4>
      <ul>${g.items.map(x => `<li>${t(x)}</li>`).join("")}</ul>
    </div>`).join("");

  /* ---------- contact ---------- */
  const kofi = P.socials.find(s => /ko-?fi/i.test(s.label));
  if (kofi) document.querySelectorAll("[data-kofi]").forEach(a => { a.href = kofi.href; });
  $("#socials").innerHTML = P.socials.filter(s => s !== kofi).map(s =>
    `<li><a href="${esc(s.href)}" target="_blank" rel="noopener">${m(s.label)}<span aria-hidden="true">&nbsp;↗</span></a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();
})();
