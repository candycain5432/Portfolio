/* ============================================================================
   main.js: renders content from data.js and wires up all interactions.
   ========================================================================== */
(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const domainById = Object.fromEntries(D.domains.map(d => [d.id, d]));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  /* ---------------- Theme ---------------- */
  (function theme() {
    const root = document.documentElement;
    let saved;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    root.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));
    $("#themeToggle").addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  })();

  /* ---------------- Fill profile ---------------- */
  const P = D.profile;
  $("#brandInitials").textContent = P.initials;
  $("#footBrandInitials").textContent = P.initials;
  $("#heroName") && ($("#heroName").textContent = P.name);
  $("#footName").textContent = P.name;
  $("#year").textContent = new Date().getFullYear();
  $("#headlineText").textContent = P.headline + " ";
  $("#headlineAccent").textContent = P.headlineAccent;
  $("#lede").textContent = P.blurb;
  $("#emailLink").href = "mailto:" + P.email;
  $("#emailLink2").href = "mailto:" + P.email;
  $("#emailText").textContent = P.email;
  const mapCount = $("#mapCount"); if (mapCount) mapCount.textContent = D.projects.length;

  /* ---------------- Rotating roles ---------------- */
  (function roles() {
    const el = $("#rotator");
    if (!el) return;
    if (REDUCED) { el.textContent = P.roles[0]; el.style.borderRight = "none"; return; }
    let i = 0, ch = 0, deleting = false;
    (function tick() {
      const word = P.roles[i];
      el.textContent = word.slice(0, ch);
      if (!deleting && ch < word.length) ch++;
      else if (deleting && ch > 0) ch--;
      else if (!deleting && ch === word.length) { deleting = true; return setTimeout(tick, 1500); }
      else { deleting = false; i = (i + 1) % P.roles.length; }
      setTimeout(tick, deleting ? 42 : 72);
    })();
  })();

  /* ---------------- Hero stats ---------------- */
  (function stats() {
    const box = $("#heroStats");
    const total = D.projects.length;
    const domCount = D.domains.length;
    const live = D.projects.filter(p => /live|running|ongoing|daily/i.test(p.status)).length;
    const data = [
      { n: total, suffix: "+", l: "Projects" },
      { n: domCount, suffix: "", l: "Domains" },
      { n: 4, suffix: "", l: "Cameras + 1 drone" },
      { n: live, suffix: "", l: "Live / ongoing" },
    ];
    box.innerHTML = data.map(s =>
      `<div class="stat"><div class="n" data-count="${s.n}" data-suffix="${s.suffix}">0</div><div class="l">${s.l}</div></div>`
    ).join("");
  })();

  /* ---------------- Domain strip ---------------- */
  (function domains() {
    const box = $("#domainStrip");
    box.innerHTML = D.domains.map(d => {
      const count = D.projects.filter(p => p.domain === d.id).length;
      return `<button class="domain-chip reveal" style="--c:${d.color}" data-domain="${d.id}">
        <div class="dc-top"><span class="dot"></span><span class="dc-name">${esc(d.label)}</span>
          <span class="dc-count">${count}</span></div>
        <div class="dc-blurb">${esc(d.blurb)}</div>
      </button>`;
    }).join("");
    $$(".domain-chip", box).forEach(c =>
      c.addEventListener("click", () => applyFilter(c.dataset.domain, true)));
  })();

  /* ---------------- Filters ---------------- */
  (function filters() {
    const box = $("#filters");
    const all = `<button class="filter active" data-filter="all">All<span class="n">${D.projects.length}</span></button>`;
    const rest = D.domains.map(d => {
      const count = D.projects.filter(p => p.domain === d.id).length;
      return `<button class="filter" data-filter="${d.id}" style="--c:${d.color}">${esc(d.label)}<span class="n">${count}</span></button>`;
    }).join("");
    box.innerHTML = all + rest;
    $$(".filter", box).forEach(f =>
      f.addEventListener("click", () => applyFilter(f.dataset.filter, false)));
  })();

  let currentFilter = "all";
  function applyFilter(id, scroll) {
    currentFilter = id;
    $$(".filter").forEach(f => f.classList.toggle("active", f.dataset.filter === id));
    $$("#projectGrid .card").forEach(c => {
      const show = id === "all" || c.dataset.domain === id;
      c.hidden = !show;
    });
    if (scroll) {
      document.getElementById("work").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
    }
  }

  /* ---------------- Project cards ---------------- */
  (function cards() {
    const grid = $("#projectGrid");
    // featured first, then the rest
    const ordered = [...D.projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    grid.innerHTML = ordered.map((p, i) => {
      const d = domainById[p.domain] || { color: "#9aa6c0", label: p.domain };
      const statusClass = p.status.toLowerCase().replace(/[^a-z]/g, "");
      return `<button class="card reveal ${p.featured ? "featured" : ""}" style="--c:${d.color}"
                data-id="${p.id}" data-domain="${p.domain}">
        <div class="c-top">
          <span class="c-dot"></span>
          <span class="c-domain">${esc(d.label)}</span>
          <span class="c-status ${statusClass}">${esc(p.status)}</span>
        </div>
        <h3>${esc(p.title)}</h3>
        <div class="c-tag">${esc(p.tagline || "")}</div>
        <p class="c-blurb">${esc(trim(p.blurb, p.featured ? 180 : 125))}</p>
        <div class="c-stack">${(p.stack || []).slice(0, p.featured ? 5 : 3).map(s => `<span class="chip-xs">${esc(s)}</span>`).join("")}</div>
        <span class="c-more">View details →</span>
      </button>`;
    }).join("");
    $$(".card", grid).forEach(c =>
      c.addEventListener("click", () => openModal(c.dataset.id)));
  })();
  function trim(s, n) { return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s; }

  /* ---------------- Photography ---------------- */
  (function photo() {
    const ph = D.photography;
    $("#photoIntro").textContent = ph.intro;
    $("#photoNote").querySelector("span").textContent = ph.note;
    $("#gearList").innerHTML = ph.gear.map(g =>
      `<li><span class="gn">${esc(g.name)}</span> <span class="gnote">${esc(g.note)}</span></li>`).join("");
    $("#photoGallery").innerHTML = ph.shots.map(s =>
      `<figure class="shot reveal">${s.src ? `<img src="${esc(s.src)}" alt="${esc(s.caption)}">` : ""}<figcaption class="cap">${esc(s.caption)}</figcaption></figure>`
    ).join("");
  })();

  /* ---------------- About + skills ---------------- */
  (function about() {
    $("#bio").innerHTML = P.bio.map(b => `<p>${esc(b)}</p>`).join("");
    $("#facts").innerHTML = P.facts.map(f =>
      `<li><span class="fk">${esc(f.k)}</span><span class="fv">${esc(f.v)}</span></li>`).join("");
    $("#skills").innerHTML = D.skills.map(g =>
      `<div class="skill-group reveal"><h4>${esc(g.group)}</h4><div class="tags">${g.items.map(i => `<span class="chip-xs">${esc(i)}</span>`).join("")}</div></div>`
    ).join("");
  })();

  /* ---------------- Socials ---------------- */
  (function socials() {
    $("#socials").innerHTML = P.socials.map(s => {
      const ph = s.href === "#";
      return `<a class="social ${ph ? "placeholder" : ""}" href="${esc(s.href)}" ${ph ? "" : 'target="_blank" rel="noopener"'}>
        <strong>${esc(s.label)}</strong> <span>${esc(s.handle)}</span></a>`;
    }).join("");
  })();

  /* ---------------- Modal ---------------- */
  const modalRoot = $("#modalRoot"), modalBody = $("#modalBody");
  let lastFocus = null;
  function openModal(id) {
    const p = D.projects.find(x => x.id === id);
    if (!p) return;
    const d = domainById[p.domain] || { color: "#9aa6c0", label: p.domain };
    const links = (p.links && p.links.length)
      ? p.links.map(l => `<a class="btn btn-ghost" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")
      : "";
    modalBody.innerHTML = `
      <div class="m-bar" style="--c:${d.color}"></div>
      <div class="m-top">
        <span class="m-domain" style="--c:${d.color}">${esc(d.label)}</span>
        <span class="m-status">${esc(p.status)} · ${esc(p.year || "")}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      <div class="m-tag">${esc(p.tagline || "")}</div>
      <p class="m-blurb">${esc(p.blurb)}</p>
      ${(p.highlights && p.highlights.length) ? `<h4>Highlights</h4>
        <ul class="m-high" style="--c:${d.color}">${p.highlights.map(h => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
      <h4>Stack</h4>
      <div class="m-stack">${(p.stack || []).map(s => `<span class="chip-xs">${esc(s)}</span>`).join("")}</div>
      ${links ? `<div class="m-links">${links}</div>` : `<p class="m-note">↳ Add links for this project in <code>js/data.js</code> (the <code>links</code> array).</p>`}
    `;
    lastFocus = document.activeElement;
    modalRoot.classList.add("open");
    modalRoot.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }
  function closeModal() {
    modalRoot.classList.remove("open");
    modalRoot.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modalRoot.classList.contains("open")) closeModal(); });

  /* ---------------- Constellation ---------------- */
  (function graph() {
    const canvas = $("#constellation");
    if (!canvas || !window.Constellation) return;
    const inst = window.Constellation.init(canvas, D, {
      onSelectProject: p => openModal(p.id),
      onSelectDomain: id => applyFilter(id, true),
      onSelectCenter: () => document.getElementById("about").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" }),
    });
    $("#cpReset").addEventListener("click", () => inst.reset());
    // legend
    $("#cpLegend").innerHTML = D.domains.map(d =>
      `<button class="lg" data-domain="${d.id}"><span class="d" style="background:${d.color};color:${d.color}"></span>${esc(d.label)}</button>`).join("");
    $$("#cpLegend .lg").forEach(b => {
      b.addEventListener("mouseenter", () => inst.highlightDomain(b.dataset.domain));
      b.addEventListener("mouseleave", () => inst.clearHover());
      b.addEventListener("click", () => applyFilter(b.dataset.domain, true));
    });
  })();

  /* ---------------- Nav: scroll state, active link, mobile ---------------- */
  (function nav() {
    const nav = $("#nav"), links = $("#navLinks");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    $("#hamburger").addEventListener("click", () => links.classList.toggle("open"));
    $$("#navLinks a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

    const sections = $$("section[id]");
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          $$("#navLinks a").forEach(a =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));
  })();

  /* ---------------- Reveal on scroll + counters ---------------- */
  (function reveal() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.matches(".hero-stats") || e.target.id === "heroStats") countUp(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(el => io.observe(el));
    const hs = $("#heroStats"); if (hs) io.observe(hs);
  })();
  function countUp(scope) {
    $$("[data-count]", scope).forEach(el => {
      const target = +el.dataset.count, suffix = el.dataset.suffix || "";
      if (REDUCED) { el.textContent = target + suffix; return; }
      const dur = 1100, t0 = performance.now();
      (function f(now) {
        const k = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * e) + (k === 1 ? suffix : "");
        if (k < 1) requestAnimationFrame(f);
      })(performance.now());
    });
  }

  /* ---------------- Back to top ---------------- */
  (function toTop() {
    const btn = $("#toTop");
    window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 600), { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));
  })();

  /* ---------------- Cursor glow (desktop, fine pointer) ---------------- */
  (function cursor() {
    if (REDUCED || !window.matchMedia("(pointer:fine)").matches) return;
    const g = $("#cursorGlow");
    g.style.display = "block";
    let x = 0, y = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
    (function loop() { x += (tx - x) * .18; y += (ty - y) * .18; g.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", e => {
      const big = e.target.closest("a,button,.card,.domain-chip");
      g.style.width = g.style.height = big ? "46px" : "26px";
    });
  })();

  /* ---------------- Preloader ---------------- */
  window.addEventListener("load", () => {
    setTimeout(() => $("#preloader").classList.add("done"), REDUCED ? 0 : 320);
  });
})();
