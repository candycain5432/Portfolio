/* ============================================================================
   main.js: builds the page from data.js and runs the interactive parts:
   the sticky bar, project grid + detail sheet, searchable project list,
   the photo strip and the full-screen photo viewer.
   ========================================================================== */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const FIGS = window.FIGURES || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior = REDUCED ? "auto" : "smooth";

  /* ---------- text helpers ---------- */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // data.js is written with straight quotes; print typographer's quotes instead.
  const smart = s => String(s == null ? "" : s)
    .replace(/(^|[\s(\[{—–-])"(?=\S)/g, "$1“").replace(/"/g, "”")
    .replace(/(^|[\s(\[{—–-])'(?=\S)/g, "$1‘").replace(/'/g, "’")
    .replace(/\.\.\./g, "…");
  // B612 Mono's curly apostrophe looks like an accent, so mono text keeps straight quotes.
  const straight = s => String(s == null ? "" : s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

  const t = s => esc(smart(s));     // regular text
  const m = s => esc(straight(s));  // mono text
  const pad = n => String(n).padStart(2, "0");

  const P = D.profile;
  const byId = Object.fromEntries(D.projects.map(p => [p.id, p]));
  const domainOf = id => (D.domains.find(d => d.id === id) || { label: id }).label;

  // Avionics colours: green = live/running, amber = in progress, plain = done.
  const tone = s => /live|running|ongoing|daily/i.test(s) ? "live"
    : /progress|concept|explor|planned/i.test(s) ? "wip" : "done";
  const status = s => `<span class="st st--${tone(s)}">${m(s)}</span>`;
  const ticks = list => (list && list.length)
    ? `<ul class="ticks">${list.map(h => `<li>${t(h)}</li>`).join("")}</ul>` : "";
  const stackLine = p => (p.stack || []).map(m).join(" · ");

  // Figure numbers follow the order the figures appear in.
  const figNo = {};
  D.projects.filter(p => p.featured).concat(D.projects.filter(p => !p.featured))
    .forEach(p => { if (FIGS[p.id] && !figNo[p.id]) figNo[p.id] = Object.keys(figNo).length + 1; });

  // suffix: marker ids inside an SVG must be unique when the same figure is shown twice.
  const screen = (id, suffix) => {
    const f = FIGS[id];
    if (!f) return "";
    const svg = suffix ? f.svg.replace(/\b(ahm?-[\w-]+)/g, "$1-" + suffix) : f.svg;
    return `<div class="screen"><div class="screen-bar"><span>Fig ${figNo[id]}</span><b>${esc(f.page || "")}</b></div>${svg}</div>`;
  };

  /* ---------- hero ---------- */
  $("#headline").textContent = smart(P.headline);
  $("#intro").textContent = smart(P.blurb);
  $$("[data-email]").forEach(a => {
    a.href = "mailto:" + P.email;
    if (a.hasAttribute("data-email-text")) a.textContent = P.email;
  });

  /* ---------- sticky bar ---------- */
  (function dock() {
    const bar = $("#dock");
    const heroBar = $(".hero .bar");
    if (!bar || !heroBar || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(([e]) => {
      const on = !e.isIntersecting;
      bar.classList.toggle("on", on);
      bar.inert = !on;
    }).observe(heroBar);

    const links = $$(".dock-nav a", bar);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => {
          if (a.hash === "#" + e.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(a => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });
  })();

  /* ---------- selected work ---------- */
  // First tile is the big one, the next two are halves, the rest thirds. On tablets the
  // grid is two-up, so a tile left alone at the end gets the side-by-side layout.
  const feat = D.projects.filter(p => p.featured);
  const size = i => i === 0 ? " tile--feature" : i < 3 ? " tile--half" : "";
  const lone = i => i === feat.length - 1 && i > 0 && (feat.length - 1) % 2 === 1 ? " tile--lone" : "";
  $("#bento").innerHTML = feat.map((p, i) => `
    <article class="tile${size(i)}${lone(i)}" id="p-${esc(p.id)}">
      ${screen(p.id)}
      <div class="tile-body">
        <p class="meta">${status(p.status)}<span>${m(domainOf(p.domain))}</span><span>${m(p.year)}</span></p>
        <h3 class="tile-title"><a class="tile-link" href="#p-${esc(p.id)}">${t(p.title)}</a></h3>
        <p class="tile-tag">${m(p.tagline)}</p>
        <p class="tile-blurb">${t(p.blurb)}</p>
        ${i === 0 ? ticks(p.highlights) : ""}
        <p class="tile-stack"><span class="sr-only">Built with </span>${stackLine(p)}</p>
      </div>
      <span class="tile-go" aria-hidden="true">→</span>
    </article>`).join("");

  /* ---------- every project ---------- */
  (function index() {
    const all = D.projects.filter(p => !p.featured);   // the featured ones are in the grid above
    const hay = p => [p.title, p.tagline, p.blurb, domainOf(p.domain), p.status, p.year]
      .concat(p.stack || [], p.highlights || []).join(" ").toLowerCase();

    $("#items").innerHTML = all.map(p => `
      <li class="item" id="p-${esc(p.id)}" data-domain="${esc(p.domain)}" data-q="${esc(hay(p))}">
        <a class="item-link" href="#p-${esc(p.id)}">
          <span class="item-name">${t(p.title)}</span>
          <span class="item-tag">${t(p.tagline)}</span>
          <span class="item-type">${m(domainOf(p.domain))}</span>
          <span class="item-status">${status(p.status)}</span>
          <span class="item-year">${m(p.year)}</span>
          <span class="item-go" aria-hidden="true">→</span>
        </a>
      </li>`).join("");

    const count = id => all.filter(p => p.domain === id).length;
    $("#filters").innerHTML =
      `<button type="button" data-f="all" aria-pressed="true">All<span>${all.length}</span></button>` +
      D.domains.filter(d => count(d.id)).map(d =>
        `<button type="button" data-f="${esc(d.id)}" aria-pressed="false">${t(d.label)}<span>${count(d.id)}</span></button>`).join("");

    const items = $$("#items .item");
    const input = $("#q"), empty = $("#empty"), countEl = $("#indexCount");
    let filter = "all";

    function apply() {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      items.forEach(li => {
        const ok = (filter === "all" || li.dataset.domain === filter) && (!q || li.dataset.q.includes(q));
        li.hidden = !ok;
        if (ok) shown += 1;
      });
      countEl.textContent = shown === items.length ? String(items.length) : `${shown} of ${items.length}`;
      empty.hidden = shown > 0;
      if (!shown) {
        const where = filter === "all" ? "" : ` in ${t(domainOf(filter))}`;
        empty.innerHTML = `Nothing matches “${esc(input.value.trim())}”${where}. <button type="button" data-clear>Clear the search</button>`;
      }
    }

    $("#filters").addEventListener("click", e => {
      const b = e.target.closest("button[data-f]");
      if (!b) return;
      filter = b.dataset.f;
      $$("#filters button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      apply();
    });
    input.addEventListener("input", apply);
    input.addEventListener("keydown", e => { if (e.key === "Escape" && input.value) { e.preventDefault(); input.value = ""; apply(); } });
    empty.addEventListener("click", e => {
      if (!e.target.closest("[data-clear]")) return;
      input.value = "";
      filter = "all";
      $$("#filters button").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.f === "all")));
      apply();
      input.focus();
    });

    // "/" jumps to the search box, like on GitHub.
    document.addEventListener("keydown", e => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement ? document.activeElement.tagName : "";
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || document.querySelector("dialog[open]")) return;
      e.preventDefault();
      input.scrollIntoView({ block: "center", behavior });
      input.focus({ preventScroll: true });
    });

    apply();
  })();

  /* ---------- project sheet ---------- */
  (function sheet() {
    const dlg = $("#sheet"), body = $("#sheetBody"), crumb = $("#sheetCrumb");
    if (!dlg || typeof dlg.showModal !== "function") return; // links still jump to the tiles
    const order = D.projects.map(p => p.id);
    let current = null, pushed = false;

    function render(id) {
      const p = byId[id], f = FIGS[id];
      current = id;
      crumb.textContent = straight(domainOf(p.domain));
      const rel = (p.related || []).filter(r => byId[r]);
      body.innerHTML = `
        <p class="meta">${status(p.status)}<span>${m(p.year)}</span>${p.featured ? "<span>Featured</span>" : ""}</p>
        <h2 class="sheet-title" id="sheetTitle">${t(p.title)}</h2>
        <p class="sheet-tag">${m(p.tagline)}</p>
        ${f ? screen(id, "s") + `<p class="fig-cap">${m(f.caption)}</p>` : ""}
        <p class="sheet-lead">${t(p.blurb)}</p>
        ${(p.highlights && p.highlights.length) ? `<h3>Highlights</h3>${ticks(p.highlights)}` : ""}
        ${(p.stack && p.stack.length) ? `<h3>Built with</h3><ul class="tags">${p.stack.map(s => `<li>${m(s)}</li>`).join("")}</ul>` : ""}
        ${rel.length ? `<h3>See also</h3><div class="related">${rel.map(r => `<a href="#p-${esc(r)}">${t(byId[r].title)}</a>`).join("")}</div>` : ""}
        ${(p.links && p.links.length) ? `<h3>Links</h3><p class="ext-links">${p.links.map(l =>
          `<a href="${esc(l.href)}" target="_blank" rel="noopener">${m(l.label)}<span aria-hidden="true">&nbsp;↗</span></a>`).join("")}</p>` : ""}`;
      body.scrollTop = 0;
    }

    // how: "push" (new history entry), "replace" (moving between projects), or "none".
    function open(id, how) {
      if (!byId[id]) return;
      render(id);
      if (!dlg.open) dlg.showModal();
      const url = "#p-" + id;
      if (how === "push") { history.pushState({ sheet: true }, "", url); pushed = true; }
      else if (how === "replace") history.replaceState(history.state, "", url);
    }
    const hashId = () => (/^#p-([\w-]+)$/.exec(location.hash) || [])[1];

    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#p-"]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = a.getAttribute("href").slice(3);
      if (!byId[id]) return;
      e.preventDefault();
      open(id, dlg.open ? "replace" : "push");
    });

    dlg.addEventListener("click", e => {
      const move = e.target.closest("[data-move]");
      if (move) {
        const i = (order.indexOf(current) + +move.dataset.move + order.length) % order.length;
        return open(order[i], "replace");
      }
      if (e.target.closest("[data-close]") || e.target === dlg) dlg.close();
    });
    dlg.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const i = (order.indexOf(current) + (e.key === "ArrowRight" ? 1 : -1) + order.length) % order.length;
        open(order[i], "replace");
      }
    });
    dlg.addEventListener("close", () => {
      current = null;
      if (!hashId()) return;
      if (pushed) { pushed = false; history.back(); }
      else history.replaceState(null, "", location.pathname + location.search);
    });
    window.addEventListener("popstate", () => {
      const id = hashId();
      if (id && byId[id]) open(id, "none");
      else if (dlg.open) { pushed = false; dlg.close(); }
    });

    if (hashId()) open(hashId(), "none");
  })();

  /* ---------- photos ---------- */
  const PH = D.photography;
  const shots = PH.shots || [];
  $("#photoIntro").textContent = smart(PH.intro);
  $("#photoNote").textContent = smart(PH.note);
  $("#gear").innerHTML = PH.gear.map(g => `<div><dt>${t(g.name)}</dt><dd>${t(g.note)}</dd></div>`).join("");

  $("#strip").innerHTML = shots.map((s, i) => `
    <figure class="frame">
      <a href="${esc(s.src)}" data-i="${i}" aria-label="${t(s.caption)}, open larger">
        <img src="${esc(s.src)}" alt="${t(s.alt || s.caption)}" width="1100" height="733" ${i > 2 ? 'loading="lazy"' : ""} decoding="async">
      </a>
      <figcaption><span class="n">${pad(i + 1)}</span>${m(s.caption)}</figcaption>
    </figure>`).join("");

  (function strip() {
    const el = $("#strip");
    const frames = $$(".frame", el);
    const prev = $('.strip-ctrl [data-dir="-1"]'), next = $('.strip-ctrl [data-dir="1"]'), count = $("#stripCount");
    if (!frames.length) return;
    const step = () => frames.length > 1 ? frames[1].offsetLeft - frames[0].offsetLeft : el.clientWidth;

    function update() {
      const max = el.scrollWidth - el.clientWidth;
      const i = Math.min(frames.length - 1, Math.round(el.scrollLeft / step()));
      count.textContent = `${pad(i + 1)} / ${pad(frames.length)}`;
      prev.disabled = el.scrollLeft <= 2;
      next.disabled = el.scrollLeft >= max - 2;
    }
    let ticking = false;
    el.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }, { passive: true });
    window.addEventListener("resize", update);
    [prev, next].forEach(b => b.addEventListener("click", () =>
      el.scrollBy({ left: +b.dataset.dir * step(), behavior })));
    update();
  })();

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

    $("#strip").addEventListener("click", e => {
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
  $("#facts").innerHTML = P.facts.map(f => `<div><dt>${m(f.k)}</dt><dd>${t(f.v)}</dd></div>`).join("");
  $("#tools").innerHTML = D.skills.map(g => `
    <div class="tool">
      <h4>${m(g.group)}</h4>
      <ul>${g.items.map(x => `<li>${t(x)}</li>`).join("")}</ul>
    </div>`).join("");

  /* ---------- contact ---------- */
  const kofi = P.socials.find(s => /ko-?fi/i.test(s.label));
  if (kofi) $$("[data-kofi]").forEach(a => { a.href = kofi.href; });
  $("#socials").innerHTML = P.socials.filter(s => s !== kofi).map(s =>
    `<li><a href="${esc(s.href)}" target="_blank" rel="noopener">${m(s.label)}<span aria-hidden="true">&nbsp;↗</span></a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();
})();
