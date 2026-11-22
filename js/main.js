/* ============================================================================
   main.js: builds the page from data.js and runs the fun bits: the hero name,
   draggable stickers, project filters, the fuel gauge, the little plane that
   flies down the page, and the photo viewer.
   ========================================================================== */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  /* ---------- text helpers ---------- */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // data.js uses straight quotes; print typographer's quotes instead.
  const smart = s => String(s == null ? "" : s)
    .replace(/(^|[\s(\[{—–-])"(?=\S)/g, "$1“").replace(/"/g, "”")
    .replace(/(^|[\s(\[{—–-])'(?=\S)/g, "$1‘").replace(/'/g, "’")
    .replace(/\.\.\./g, "…");
  // B612 Mono's curly apostrophe looks like an accent, so mono text keeps straight quotes.
  const straight = s => String(s == null ? "" : s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const t = s => esc(smart(s));
  const m = s => esc(straight(s));
  const pad = n => String(n).padStart(2, "0");

  const P = D.profile;
  const byId = Object.fromEntries(D.projects.map(p => [p.id, p]));
  const domain = id => D.domains.find(d => d.id === id) || { id, label: id };
  const tone = s => /live|running|ongoing|daily/i.test(s) ? "live" : /progress|concept|explor|planned/i.test(s) ? "wip" : "done";
  const plane = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5c.9 0 1.4 1 1.4 2.2v5.5l7.6 4.5v2.2l-7.6-2.3v4.8l2.3 1.7v1.5L12 20.5l-3.7 1.1v-1.5l2.3-1.7v-4.8L3 15.9v-2.2l7.6-4.5V3.7c0-1.2.5-2.2 1.4-2.2z"/></svg>';
  const kofi = (P.socials.find(s => /ko-?fi/i.test(s.label)) || {}).href;

  /* ---------- hero ---------- */
  $("#headline").textContent = smart(P.headline);
  $("#intro").textContent = smart(P.blurb);
  $$("[data-email]").forEach(a => {
    a.href = "mailto:" + P.email;
    if (a.hasAttribute("data-email-text")) a.textContent = P.email;
  });
  if (kofi) $$("[data-kofi]").forEach(a => { a.href = kofi; });

  // Split the name into letters so they can stretch in one after another.
  let i = 0;
  $$(".name-word").forEach(w => {
    w.setAttribute("aria-hidden", "true");
    w.innerHTML = [...w.textContent].map(ch => `<span class="ch" style="--i:${i++}">${esc(ch)}</span>`).join("");
  });

  /* ---------- stickers (drag them around) ---------- */
  $("#stickers").innerHTML = (D.stickers || []).map(s => `<li class="sticker">${t(s)}</li>`).join("");
  $$(".sticker").forEach(el => {
    let start = null, dx = 0, dy = 0;
    el.addEventListener("pointerdown", e => {
      start = { x: e.clientX - dx, y: e.clientY - dy };
      el.setPointerCapture(e.pointerId);
      el.classList.add("dragging");
    });
    el.addEventListener("pointermove", e => {
      if (!start) return;
      dx = e.clientX - start.x; dy = e.clientY - start.y;
      el.style.setProperty("--dx", dx + "px");
      el.style.setProperty("--dy", dy + "px");
    });
    const stop = () => { start = null; el.classList.remove("dragging"); };
    el.addEventListener("pointerup", stop);
    el.addEventListener("pointercancel", stop);
  });

  /* ---------- marquee ---------- */
  const strip = (D.marquee || []).map(x => `<span>${t(x)}</span>${plane}`).join("");
  $("#marquee").innerHTML = strip + strip;   // twice, so the loop is seamless

  /* ---------- section titles: letters that drop in ---------- */
  $$("[data-stretch]").forEach(h => {
    const text = h.textContent.trim();
    h.setAttribute("aria-label", smart(text));
    let k = 0;
    h.innerHTML = smart(text).split(" ").map(word =>
      `<span class="word" aria-hidden="true">${[...word].map(ch => `<span class="ch" style="--i:${k++}">${esc(ch)}</span>`).join("")}</span>`
    ).join(" ");
  });
  if ("IntersectionObserver" in window && !REDUCED) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }), { threshold: .15, rootMargin: "0px 0px -8% 0px" });
    $$("[data-stretch]").forEach(h => { h.classList.add("drop"); io.observe(h); });
  }

  /* ---------- work: big cards ---------- */
  const card = p => {
    const d = domain(p.domain), s = tone(p.status);
    const rel = (p.related || []).filter(r => byId[r]);
    return `
    <article class="card" id="p-${esc(p.id)}" style="--c: var(--c-${esc(p.domain)})">
      <div class="card-top"><span class="type">${m(d.label)}</span><span class="type">${m(p.year)}</span></div>
      <span class="stamp stamp--${s}">${m(p.status)}<small>${m(p.year)}</small></span>
      <h3 class="card-title">${t(p.title)}</h3>
      <p class="card-tag">${t(p.tagline)}</p>
      <p class="card-blurb">${t(p.blurb)}</p>
      ${(p.highlights || []).length ? `<ul class="ticks">${p.highlights.map(h => `<li>${t(h)}</li>`).join("")}</ul>` : ""}
      <ul class="pills" aria-label="Built with">${(p.stack || []).map(x => `<li>${m(x)}</li>`).join("")}</ul>
      ${rel.length ? `<p class="see">See also: ${rel.map(r => `<a href="#p-${esc(r)}">${m(byId[r].title)}</a>`).join(", ")}</p>` : ""}
      ${(p.links || []).length ? `<p class="see">${p.links.map(l => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${m(l.label)} ↗</a>`).join(" · ")}</p>` : ""}
    </article>`;
  };
  $("#cards").innerHTML = D.projects.filter(p => p.featured).map(card).join("");

  /* ---------- work: the smaller stuff ---------- */
  (function minis() {
    const rest = D.projects.filter(p => !p.featured);
    $("#minis").innerHTML = rest.map(p => {
      const d = domain(p.domain), s = tone(p.status);
      const hay = [p.title, p.tagline, p.blurb, d.label, p.status].concat(p.stack || [], p.highlights || []).join(" ").toLowerCase();
      return `
      <article class="mini" id="p-${esc(p.id)}" data-domain="${esc(p.domain)}" data-q="${esc(hay)}" style="--c: var(--c-${esc(p.domain)})">
        <div class="mini-top"><span>${m(d.label)}</span><span class="dot dot--${s}">${m(p.status)}</span></div>
        <h4 class="mini-title">${t(p.title)}</h4>
        <p class="mini-tag">${t(p.tagline)}</p>
        <p class="mini-blurb">${t(p.blurb)}</p>
        <p class="mini-stack">${(p.stack || []).map(m).join(" · ")}</p>
      </article>`;
    }).join("");

    const count = id => rest.filter(p => p.domain === id).length;
    $("#chips").innerHTML =
      `<button class="chip" type="button" data-f="all" aria-pressed="true">All<span class="n">${rest.length}</span></button>` +
      D.domains.filter(d => count(d.id)).map(d =>
        `<button class="chip" type="button" data-f="${esc(d.id)}" aria-pressed="false" style="--c: var(--c-${esc(d.id)})">${t(d.label)}<span class="n">${count(d.id)}</span></button>`).join("");

    const cards = $$("#minis .mini"), input = $("#q"), empty = $("#empty"), more = $("#showAll");
    const FIRST = 6;                 // how many show before "Show all"
    let filter = "all", expanded = false;
    function apply() {
      const q = input.value.trim().toLowerCase();
      const narrowed = filter !== "all" || q;
      let shown = 0, matches = 0;
      cards.forEach(c => {
        const ok = (filter === "all" || c.dataset.domain === filter) && (!q || c.dataset.q.includes(q));
        if (ok) matches += 1;
        const visible = ok && (expanded || narrowed || matches <= FIRST);
        c.hidden = !visible;
        if (visible) shown += 1;
      });
      more.hidden = expanded || narrowed || matches <= FIRST;
      more.textContent = `Show all ${matches} projects ↓`;
      empty.hidden = shown > 0;
      if (!shown) empty.innerHTML = `Nothing matches “${esc(input.value.trim())}”. <button type="button" data-clear>Show everything</button>`;
    }
    function reset() {
      input.value = ""; filter = "all";
      $$("#chips .chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.f === "all")));
      apply();
    }
    $("#chips").addEventListener("click", e => {
      const b = e.target.closest(".chip");
      if (!b) return;
      filter = b.dataset.f;
      $$("#chips .chip").forEach(c => c.setAttribute("aria-pressed", String(c === b)));
      apply();
    });
    more.addEventListener("click", () => {
      expanded = true;
      apply();
      const next = cards[FIRST];
      if (next) next.querySelector("h4").setAttribute("tabindex", "-1"), next.querySelector("h4").focus({ preventScroll: true });
    });
    input.addEventListener("input", apply);
    input.addEventListener("keydown", e => { if (e.key === "Escape" && input.value) { e.preventDefault(); input.value = ""; apply(); } });
    empty.addEventListener("click", e => { if (e.target.closest("[data-clear]")) { reset(); input.focus(); } });

    // "/" jumps to the search box.
    document.addEventListener("keydown", e => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || "") || $("dialog[open]")) return;
      e.preventDefault();
      input.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" });
      input.focus({ preventScroll: true });
    });

    // Links to a project (#p-...) un-hide it if a filter is hiding it, then flash it.
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#p-"]');
      if (!a) return;
      const el = document.getElementById(a.getAttribute("href").slice(1));
      if (!el) return;
      if (el.hidden) { expanded = true; reset(); }
      el.classList.remove("flash");
      setTimeout(() => el.classList.add("flash"), REDUCED ? 0 : 450);
    });

    apply();
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target && target.hidden) { expanded = true; apply(); requestAnimationFrame(() => target.scrollIntoView()); }
  })();

  /* ---------- learning ---------- */
  const L = D.learning || { items: [] };
  $("#learnIntro").textContent = smart(L.intro);
  $("#learned").innerHTML = L.items.map(x => `
    <li class="${x.still ? "still" : ""}">${t(x.what)}${x.still ? '<span class="still-note">still on it</span>' : ""}${byId[x.via] ? `<a class="via" href="#p-${esc(x.via)}">via ${m(byId[x.via].title)}</a>` : ""}</li>`).join("");
  $("#learnNow").textContent = smart(L.now);
  $("#learnNext").textContent = smart(L.next);

  /* ---------- the photo viewer (shared by every gallery on the page) ---------- */
  const galleries = {};   // name -> list of { src, caption, alt }
  (function viewer() {
    const dlg = $("#viewer");
    if (!dlg || typeof dlg.showModal !== "function") return;  // links still open the image
    const img = $("#viewerImg"), cap = $("#viewerCap"), count = $("#viewerCount");
    const steps = $$("[data-step]", dlg);
    let list = [], at = 0;
    function show(n) {
      at = (n + list.length) % list.length;
      const s = list[at];
      img.src = s.full || s.src;
      img.alt = smart(s.alt || s.caption || "");
      cap.textContent = smart(s.caption || "");
      count.textContent = list.length > 1 ? `${at + 1} / ${list.length}` : "";
      steps.forEach(b => { b.hidden = list.length < 2; });
      if (list.length > 1) [at + 1, at - 1].forEach(k => { const n = list[(k + list.length) % list.length]; new Image().src = n.full || n.src; });
    }
    // Any link with data-gallery="name" data-i="n" opens that gallery at photo n.
    document.addEventListener("click", e => {
      const a = e.target.closest("a[data-gallery]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      const g = galleries[a.dataset.gallery];
      if (!g || !g.length) return;
      e.preventDefault();
      list = g;
      show(+a.dataset.i || 0);
      dlg.showModal();
    });
    dlg.addEventListener("click", e => {
      const step = e.target.closest("[data-step]");
      if (step) return show(at + +step.dataset.step);
      if (e.target.closest("[data-close]") || e.target === dlg || e.target.classList.contains("viewer-stage")) dlg.close();
    });
    dlg.addEventListener("keydown", e => {
      if (list.length < 2) return;
      if (e.key === "ArrowRight") { e.preventDefault(); show(at + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(at - 1); }
    });
    let x0 = null;
    dlg.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", e => {
      if (x0 === null || list.length < 2) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  })();

  /* ---------- off the clock ---------- */
  (function life() {
    const F = D.life || {};
    const ph = F.philosophy || {}, fuel = F.fuel || {};
    const ARR = '<svg class="arr" viewBox="0 0 40 24" aria-hidden="true"><use href="#scribble"/></svg>';

    // A spread: one big photo, one taped-on print, and a bit of text.
    function spread(el, block, gallery) {
      if (!el || !block) return;
      const photos = (block.photos || []).filter(p => p.src);
      galleries[gallery] = photos;
      const link = (p, i) => `<a href="${esc(p.full || p.src)}" data-gallery="${gallery}" data-i="${i}" aria-label="${t(p.caption || block.title)}, open larger">
          <img src="${esc(p.src)}" alt="${t(p.alt || p.caption)}" loading="lazy" decoding="async"></a>`;
      el.innerHTML = `
      ${photos[0] ? `<figure class="spread-main">${link(photos[0], 0)}${photos[0].caption ? `<figcaption class="hand">${t(photos[0].caption)} ${ARR}</figcaption>` : ""}</figure>` : ""}
      <div class="spread-text">
        ${block.label ? `<p class="tile-label">${t(block.label)}</p>` : ""}
        <h3 class="spread-title">${t(block.title)}</h3>
        <p class="spread-copy">${t(block.text)}</p>
      </div>
      ${photos[1] ? `<figure class="polaroid spread-print">${link(photos[1], 1)}${photos[1].caption ? `<figcaption>${t(photos[1].caption)}</figcaption>` : ""}</figure>` : ""}`;
    }
    spread($("#mtb"), F.mtb, "mtb");
    spread($("#flying"), F.flying, "flying");

    // Before / during / after, with hand-drawn arrows between the steps.
    // The "before" step is a pencil sketch of the stock radio (there's no photo of it).
    const RADIO = `<svg class="radio-sketch" viewBox="0 0 300 400" role="img" aria-label="A pencil drawing of the stock radio: a CD slot, a small screen and rows of buttons, above the climate controls">
        <defs>
          <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="1.1" opacity=".4"/>
          </pattern>
        </defs>
        <g class="sk" filter="url(#pencil)">
          <path d="M30 64C36 180 44 290 56 400M42 66C48 180 56 290 68 400M270 64C264 180 256 290 244 400M258 66C252 180 244 290 232 400"/>
          <rect x="48" y="76" width="34" height="74" rx="6"/><rect x="218" y="76" width="34" height="74" rx="6"/>
          <path class="thin" d="M53 90h24M53 102h24M53 114h24M53 126h24M53 138h24M223 90h24M223 102h24M223 114h24M223 126h24M223 138h24"/>
          <rect x="88" y="74" width="124" height="108" rx="9"/>
          <path class="thick" d="M112 86h76"/>
          <circle cx="100" cy="96" r="6"/><circle cx="200" cy="96" r="6"/>
          <rect x="112" y="98" width="76" height="34" rx="3" fill="url(#hatch)"/>
          <path class="thin" d="M120 110h34M120 120h22"/>
          <path class="thin" d="M94 110h12v9h-12zM94 124h12v9h-12zM94 138h12v9h-12zM194 110h12v9h-12zM194 124h12v9h-12zM194 138h12v9h-12z"/>
          <path class="thin" d="M107 150h12v10h-12zM122 150h12v10h-12zM137 150h12v10h-12zM152 150h12v10h-12zM167 150h12v10h-12zM182 150h12v10h-12z"/>
          <rect x="92" y="190" width="116" height="18" rx="5"/>
          <path d="M150 192l8 13h-16z"/>
          <path class="thin" d="M104 195h20v8h-20zM176 195h20v8h-20z"/>
          <rect x="92" y="216" width="116" height="84" rx="8"/>
          <rect x="116" y="224" width="68" height="18" rx="2"/>
          <circle cx="150" cy="272" r="17"/><circle class="thin" cx="150" cy="272" r="9"/>
          <path class="thin" d="M100 252h14v9h-14zM100 268h14v9h-14zM100 284h14v9h-14zM186 252h14v9h-14zM186 268h14v9h-14zM186 284h14v9h-14z"/>
          <path class="thin" d="M140 313h20v8h-20z"/><circle class="thin" cx="118" cy="317" r="4"/><circle class="thin" cx="182" cy="317" r="4"/>
          <path d="M122 400L132 356Q150 344 168 356L178 400"/>
          <ellipse cx="150" cy="350" rx="15" ry="13"/>
          <path class="thin" d="M66 40Q86 54 108 82M105.9 73.2L108 82L100 77.9"/>
          <path class="thin" d="M232 42Q216 66 182 108M190.1 104.1L182 108L184.2 99.3"/>
        </g>
        <text class="sk-note" x="22" y="34">CD slot</text>
        <text class="sk-note" x="282" y="34" text-anchor="end">tiny screen</text>
      </svg>`;
    (function build() {
      const el = $("#build"), car = F.car;
      if (!el || !car) return;
      const steps = car.steps || [];
      galleries.car = steps.filter(s => s.src);
      const tilt = [-2.2, 1.6, -1.2];
      let k = 0;
      el.innerHTML = `
      <div class="build-text">
        ${car.label ? `<p class="tile-label">${t(car.label)}</p>` : ""}
        <h3 class="spread-title">${t(car.title)}</h3>
        <p class="spread-copy">${t(car.text)}</p>
      </div>
      <ol class="steps">${steps.map((s, n) => `
        <li class="step" style="--r:${tilt[n % tilt.length]}deg">
          <p class="step-label hand">${t(s.label)}</p>
          ${s.src
            ? `<a class="step-pic" href="${esc(s.full || s.src)}" data-gallery="car" data-i="${k++}" aria-label="${t(s.label)}: ${t(s.caption || "photo")}, open larger"><img src="${esc(s.src)}" alt="${t(s.alt || s.caption)}" loading="lazy" decoding="async"></a>`
            : `<div class="step-pic step-pic--drawn">${s.drawing ? RADIO : ""}</div>`}
          ${s.caption ? `<p class="step-cap hand">${t(s.caption)}</p>` : ""}
        </li>`).join("")}
      </ol>`;
    })();

    const gauge = (() => {
      const cx = 100, cy = 112, r = 78;            // hub and dial radius
      const A0 = 160, A1 = 20;                     // E end and F end of the dial (degrees)
      const pt = (deg, rad) => [cx + rad * Math.cos(deg * Math.PI / 180), cy - rad * Math.sin(deg * Math.PI / 180)].map(n => +n.toFixed(1));
      let ticks = "";
      for (let k = 0; k <= 8; k++) {
        const a = A0 - (A0 - A1) * k / 8, major = k % 4 === 0;
        const [x1, y1] = pt(a, r), [x2, y2] = pt(a, major ? r - 15 : r - 9);
        ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${major ? 4 : 2.5}"/>`;
      }
      const [s0x, s0y] = pt(A0, r), [s1x, s1y] = pt(A1, r);
      const [rx0, ry0] = pt(A0, r + 7), [rx1, ry1] = pt(A0 - 22, r + 7);   // the red "reserve" zone near E
      const [ex, ey] = pt(A0 + 10, r - 4), [fx, fy] = pt(A1 - 10, r - 4);
      return `<svg viewBox="0 0 200 150" role="img" aria-label="A fuel gauge for Red Bull, with the needle almost on empty">
        <path d="M${s0x} ${s0y}A${r} ${r} 0 0 1 ${s1x} ${s1y}" fill="none" stroke="currentColor" stroke-width="3"/>
        <path d="M${rx0} ${ry0}A${r + 7} ${r + 7} 0 0 1 ${rx1} ${ry1}" fill="none" stroke="var(--orange)" stroke-width="7" stroke-linecap="round"/>
        <g stroke="currentColor" stroke-linecap="round">${ticks}</g>
        <text x="${ex}" y="${ey}" text-anchor="middle" dominant-baseline="middle" font-family="var(--mona)" font-weight="850" font-size="18" fill="currentColor">E</text>
        <text x="${fx}" y="${fy}" text-anchor="middle" dominant-baseline="middle" font-family="var(--mona)" font-weight="850" font-size="18" fill="currentColor">F</text>
        <text x="100" y="141" text-anchor="middle" font-family="var(--mono)" font-weight="700" font-size="9.5" letter-spacing="2" fill="currentColor">RED BULL</text>
        <g class="gauge-needle"><line x1="${cx}" y1="${cy + 6}" x2="${cx}" y2="${cy - r + 16}" stroke="var(--orange)" stroke-width="4" stroke-linecap="round"/></g>
        <circle cx="${cx}" cy="${cy}" r="8" fill="currentColor"/>
      </svg>`;
    })();

    $("#lifeTiles").innerHTML = [
      `<div class="tile tile--quote"><p class="tile-label">Philosophy</p><blockquote>${t(ph.quote)}</blockquote><p class="tile-text">${t(ph.note)}</p></div>`,
      `<div class="tile tile--fuel" id="fuel"><p class="tile-label">${t(fuel.title)}</p>${gauge}<p class="tile-text">${t(fuel.text)}</p>${kofi ? `<a class="btn btn-fuel" href="${esc(kofi)}" target="_blank" rel="noopener">${t(fuel.cta)}<span aria-hidden="true">&nbsp;↗</span></a>` : ""}</div>`,
      `<div class="tile tile--term" role="img" aria-label="A terminal showing that this computer runs Arch Linux">
        <div class="term-bar" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="term-body" aria-hidden="true">
          <p><span class="p">$</span> cat /etc/os-release | head -1</p>
          <p>NAME="Arch Linux"</p>
          <p><span class="p">$</span> <span class="c"># btw</span><span class="cursor"></span></p>
        </div>
        <p class="term-cap" aria-hidden="true">LUKS + btrfs · Hyprland · Waybar · Quickshell</p>
      </div>`,
    ].join("");

    // The needle starts full and drains to nearly empty when you scroll to it.
    const g = $("#fuel .gauge-needle");
    if (!g) return;
    const level = l => -70 + 140 * l;
    if (REDUCED || !("IntersectionObserver" in window)) { g.style.setProperty("--needle", level(.06) + "deg"); return; }
    g.style.setProperty("--needle", level(1) + "deg");
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      g.style.setProperty("--needle", level(.06) + "deg");
      io.disconnect();
    }, { threshold: .6 });
    io.observe($("#fuel"));
  })();

  /* ---------- scrapbook ---------- */
  (function scrapbook() {
    const CAM = '<svg class="scrap-cam" viewBox="0 0 64 48" aria-hidden="true"><path d="M6.4 15c-.2-2.7 1.8-4.6 4.4-4.6h8.4l3.5-5.4h19.6l3.3 5.5 8.5-.1c2.7 0 4.6 1.9 4.5 4.6l-.4 24.4c0 2.5-2 4.3-4.5 4.2H10.6c-2.5.1-4.4-1.8-4.3-4.3z"/><circle cx="32.2" cy="26.4" r="10.6"/><circle cx="32" cy="26.2" r="5"/><path d="M49.6 16.8h3.4"/></svg>';
    const S = D.scrapbook || {};
    const spots = S.photos || [];
    $("#scrapNote").textContent = smart(S.note || "");
    const filled = spots.filter(p => p.src);
    galleries.scrapbook = filled;
    const tilts = [-2.4, 1.8, -1.2, 2.8, -3, 1.3, 2.2, -1.8, 3.2, -.8, 1.6, -2.6];
    const tapes = ["", "tape-l", "tape-r", "", "tape-r", "tape-l", "tape-2"];
    let k = 0;
    $("#scraps").innerHTML = spots.map((p, n) => {
      const shape = /^(tall|wide|square)$/.test(p.shape) ? p.shape : "square";
      const cls = `scrap scrap--${shape} ${tapes[n % tapes.length]}`;
      const style = `--r:${tilts[n % tilts.length]}deg`;
      if (!p.src) {
        return `<li class="${cls} scrap--empty" style="${style}" aria-hidden="true">
          <div class="scrap-pic">${CAM}<span class="hand">photo goes here</span><span class="scrap-n">#${pad(n + 1)}</span></div>
        </li>`;
      }
      return `<li class="${cls}" style="${style}">
          <a class="scrap-pic" href="${esc(p.full || p.src)}" data-gallery="scrapbook" data-i="${k++}" aria-label="${t(p.caption || "Photo")}, open larger">
            <img src="${esc(p.src)}" alt="${t(p.alt || p.caption || "")}" loading="lazy" decoding="async">
          </a>
          ${p.caption ? `<p class="scrap-cap hand">${t(p.caption)}</p>` : ""}
        </li>`;
    }).join("");

    // A photo that can't be found (a typo in data.js, say) turns back into an empty spot
    // that names the missing file, instead of showing a broken image.
    $$("#scraps img").forEach(img => img.addEventListener("error", () => {
      const li = img.closest(".scrap"), src = img.getAttribute("src");
      galleries.scrapbook = galleries.scrapbook.filter(x => x.src !== src);
      li.classList.add("scrap--empty");
      li.setAttribute("aria-hidden", "true");
      li.innerHTML = `<div class="scrap-pic">${CAM}<span class="hand">can't find this one</span><span class="scrap-n">${esc(src.split("/").pop())}</span></div>`;
      $$("#scraps a[data-gallery]").forEach((a, n) => { a.dataset.i = n; });
    }, { once: true }));
  })();

  /* ---------- photos ---------- */
  const PH = D.photography;
  const shots = PH.shots || [];
  galleries.planes = shots;
  $("#photoIntro").textContent = smart(PH.intro);
  $("#gear").innerHTML = PH.gear.map(g => `<li>${t(g.name)}<span>${m(g.note)}</span></li>`).join("");
  $("#wall").innerHTML = shots.map((s, n) => `
    <figure class="snap${n === 0 ? " snap--lead" : ""}">
      <a href="${esc(s.src)}" data-gallery="planes" data-i="${n}" aria-label="${t(s.caption)}, open larger">
        <img src="${esc(s.src)}" alt="${t(s.alt || s.caption)}" loading="lazy" decoding="async">
      </a>
      <figcaption><span class="n">${pad(n + 1)}</span>${t(s.caption)}</figcaption>
    </figure>`).join("") +
    (PH.note ? `<div class="postit"><p class="postit-label">Next up</p><p class="hand">${t(PH.note)}</p></div>` : "");

  /* ---------- contact ---------- */
  $("#socials").innerHTML = P.socials.filter(s => !/ko-?fi/i.test(s.label)).map(s =>
    `<li><a href="${esc(s.href)}" target="_blank" rel="noopener">${t(s.label)}<span aria-hidden="true">&nbsp;↗</span></a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* ---------- nav: which section am I in ---------- */
  const navLinks = $$(".nav-links a");
  const sections = navLinks.map(a => document.querySelector(a.hash)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => {
        if (a.hash === "#" + e.target.id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }), { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- the little plane flying down the right side ---------- */
  (function flight() {
    const box = $(".flight"), planeEl = $("#flightPlane"), stops = $("#flightStops");
    if (!box || !planeEl) return;
    const labels = { work: "Work", learning: "Learn", life: "Life", photos: "Photos", contact: "Say hi" };
    stops.innerHTML = sections.map(s => `<li data-for="${esc(s.id)}">${esc(labels[s.id] || s.id)}</li>`).join("");
    const items = $$("li", stops);
    let marks = [];
    function layout() {
      const max = document.documentElement.scrollHeight - innerHeight;
      marks = sections.map(s => Math.min(1, Math.max(0, (s.offsetTop - innerHeight * .45) / max)));
      const h = box.clientHeight;
      items.forEach((li, k) => { li.style.top = (marks[k] * (h - 24) + 12) + "px"; });
      update();
    }
    function update() {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      planeEl.style.setProperty("--y", (p * (box.clientHeight - 24)) + "px");
      items.forEach((li, k) => li.classList.toggle("passed", p >= marks[k] - .002));
    }
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }, { passive: true });
    addEventListener("resize", layout);
    addEventListener("load", layout);
    layout();
  })();
})();
