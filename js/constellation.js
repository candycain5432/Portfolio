/* ============================================================================
   constellation.js: interactive force-laid node graph of the portfolio.
   Center → domain hubs → project nodes, plus cross-links for shared tech.
   Hover lights up a node + its neighbors; click fires onSelect*; drag moves.
   Canvas 2D, DPR-aware, settles via a light spring/repulsion sim.
   Labels use opaque pills + collision-avoidance so text stays readable.
   ========================================================================== */
(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init(canvas, data, opts) {
    opts = opts || {};
    const ctx = canvas.getContext("2d");
    const domainsById = Object.fromEntries(data.domains.map(d => [d.id, d]));

    let W = 0, H = 0, DPR = 1, cx = 0, cy = 0, scale = 1, stretch = 1;
    const nodes = [];
    const edges = [];
    const byId = {};
    let hoverId = null, activeNeighbors = new Set();
    let drag = null, pointerDown = null, moved = false;
    let raf = null, t0 = performance.now();

    /* ---- build graph ---- */
    const center = mkNode({ id: "__me", type: "center", label: data.profile.initials, color: "#ffffff" });
    data.domains.forEach(d => {
      const n = mkNode({ id: "dom:" + d.id, type: "domain", label: d.label, color: d.color, domain: d.id });
      edges.push({ a: center.id, b: n.id, kind: "spine" });
    });
    data.projects.forEach(p => {
      const d = domainsById[p.domain] || { color: "#9aa6c0" };
      mkNode({ id: p.id, type: "project", label: p.title, color: d.color, domain: p.domain, featured: !!p.featured, data: p });
      edges.push({ a: "dom:" + p.domain, b: p.id, kind: "branch" });
    });
    const seen = new Set();
    data.projects.forEach(p => (p.related || []).forEach(r => {
      const tgt = byId[r] ? r : (byId["dom:" + r] ? "dom:" + r : null);
      if (!tgt || tgt === p.id) return;
      const key = [p.id, tgt].sort().join("|");
      if (seen.has(key)) return; seen.add(key);
      edges.push({ a: p.id, b: tgt, kind: "link" });
    }));

    function mkNode(o) {
      o.x = (Math.random() - .5) * 240;
      o.y = (Math.random() - .5) * 240;
      o.vx = 0; o.vy = 0;
      o.fixed = o.type === "center";
      nodes.push(o); byId[o.id] = o; return o;
    }

    /* ---- layout seeding (radial clusters) ---- */
    function seed() {
      const doms = data.domains;
      doms.forEach((d, i) => {
        const a = (i / doms.length) * Math.PI * 2 - Math.PI / 2;
        const hub = byId["dom:" + d.id];
        hub.x = Math.cos(a) * 250; hub.y = Math.sin(a) * 250;
        const kids = nodes.filter(n => n.type === "project" && n.domain === d.id);
        kids.forEach((k, j) => {
          const spread = (j - (kids.length - 1) / 2) * 0.52;
          const ka = a + spread;
          const kr = 250 + 140 + (j % 2) * 30;
          k.x = Math.cos(ka) * kr; k.y = Math.sin(ka) * kr;
        });
      });
    }

    /* ---- physics ---- */
    function rest(kind) { return kind === "spine" ? 175 : kind === "branch" ? 118 : 175; }
    function stiff(kind) { return kind === "spine" ? 0.02 : kind === "branch" ? 0.028 : 0.006; }

    function step() {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = a.x - b.x, dy = a.y - b.y;
          let d2 = dx * dx + dy * dy || 0.01;
          if (d2 < 150000) {
            const f = Math.min(3600 / d2, 5);
            const d = Math.sqrt(d2);
            dx /= d; dy /= d;
            a.vx += dx * f; a.vy += dy * f;
            b.vx -= dx * f; b.vy -= dy * f;
          }
        }
      }
      for (const e of edges) {
        const a = byId[e.a], b = byId[e.b];
        let dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const diff = (d - rest(e.kind)) * stiff(e.kind);
        dx = dx / d * diff; dy = dy / d * diff;
        if (!a.fixed) { a.vx += dx; a.vy += dy; }
        if (!b.fixed) { b.vx -= dx; b.vy -= dy; }
      }
      for (const n of nodes) {
        if (n.fixed) { n.x = 0; n.y = 0; n.vx = n.vy = 0; continue; }
        if (drag === n) continue;
        n.vx += -n.x * 0.0013;
        n.vy += -n.y * 0.0013;
        n.vx *= 0.86; n.vy *= 0.86;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 6) { n.vx *= 6 / sp; n.vy *= 6 / sp; }
        n.x += n.vx; n.y += n.vy;
      }
    }
    function prewarm(n) { for (let i = 0; i < n; i++) step(); }

    /* ---- sizing ---- */
    function resize() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2; cy = H / 2;
      scale = Math.max(0.5, Math.min(Math.min(W, H) / 820, 0.95));
      // use extra horizontal room on wide stages
      stretch = Math.max(1, Math.min(W / H / 1.1, 1.5));
    }

    const toScreen = n => ({ x: cx + n.x * scale * stretch, y: cy + n.y * scale });
    function nodeRadius(n) {
      if (n.type === "center") return 16;
      if (n.type === "domain") return 9;
      return n.featured ? 7.5 : 5;
    }
    function pick(px, py) {
      let best = null, bestD = 24;
      for (const n of nodes) {
        const s = toScreen(n);
        const d = Math.hypot(px - s.x, py - s.y);
        const hit = nodeRadius(n) * scale + 13;
        if (d < hit && d < bestD + nodeRadius(n)) { best = n; bestD = d; }
      }
      return best;
    }
    function neighborsOf(id) {
      const set = new Set([id]);
      for (const e of edges) { if (e.a === id) set.add(e.b); if (e.b === id) set.add(e.a); }
      return set;
    }

    /* ---- draw ---- */
    function draw(now) {
      const time = (now - t0) / 1000;
      if (!REDUCED) step();
      ctx.clearRect(0, 0, W, H);
      const hot = hoverId || (drag && drag.id);
      const lightTheme = themeKey() === "light";

      // edges
      for (const e of edges) {
        const a = toScreen(byId[e.a]), b = toScreen(byId[e.b]);
        const on = hot && activeNeighbors.has(e.a) && activeNeighbors.has(e.b) && (e.a === hot || e.b === hot);
        const col = colorFor(e);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.lineWidth = on ? 2 : (e.kind === "spine" ? 1.1 : 0.8);
        ctx.strokeStyle = fade(col, hot
          ? (on ? 0.95 : (lightTheme ? 0.07 : 0.05))
          : (e.kind === "link" ? (lightTheme ? 0.24 : 0.12) : (lightTheme ? 0.34 : 0.2)));
        if (e.kind === "link" && !on) ctx.setLineDash([3, 6]); else ctx.setLineDash([]);
        ctx.stroke(); ctx.setLineDash([]);
        if (!REDUCED && !hot && e.kind !== "link") {
          const tt = (time * 0.22 + hashT(e)) % 1;
          ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * tt, a.y + (b.y - a.y) * tt, 1.7, 0, 7);
          ctx.fillStyle = fade(col, 0.55); ctx.fill();
        }
      }

      // nodes
      for (const n of nodes) {
        const s = toScreen(n);
        const r = nodeRadius(n) * scale;
        const dim = hot && !activeNeighbors.has(n.id);
        const isHot = n.id === hot;
        const pulse = REDUCED ? 0 : Math.sin(time * 1.6 + hashT(n)) * 0.5 + 0.5;
        const gr = r * (isHot ? 4.4 : 3) + pulse * 2;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, gr);
        g.addColorStop(0, fade(n.color, dim ? 0.07 : (isHot ? 0.7 : 0.42)));
        g.addColorStop(1, fade(n.color, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, gr, 0, 7); ctx.fill();

        ctx.beginPath(); ctx.arc(s.x, s.y, r + (isHot ? 1.6 : 0), 0, 7);
        if (n.type === "center") {
          const cg = ctx.createLinearGradient(s.x - r, s.y - r, s.x + r, s.y + r);
          cg.addColorStop(0, "#7c9cff"); cg.addColorStop(1, "#43d9e6"); ctx.fillStyle = cg;
        } else ctx.fillStyle = dim ? fade(n.color, 0.32) : n.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = lightTheme ? `rgba(20,26,43,${dim ? 0.08 : 0.26})` : `rgba(255,255,255,${dim ? 0.06 : 0.24})`;
        ctx.stroke();
      }

      // labels (priority-ordered, collision-avoided)
      const placed = [];
      const order = nodes.slice().sort((a, b) => labelPriority(b) - labelPriority(a));
      ctx.textBaseline = "middle"; ctx.textAlign = "left";
      for (const n of order) {
        const show = hot ? (n.id === hot || activeNeighbors.has(n.id))
                         : (n.type !== "project" || n.featured);
        if (!show) continue;
        const dim = hot && !activeNeighbors.has(n.id);
        const s = toScreen(n), r = nodeRadius(n) * scale;
        const fs = n.type === "center" ? 14 : n.type === "domain" ? 13 : n.featured ? 12 : 11.5;
        ctx.font = (n.type === "center" || n.type === "domain" ? "700 " : "600 ") + fs + "px Inter, system-ui, sans-serif";
        const tw = ctx.measureText(n.label).width;
        const pad = 7, h = fs + 10;
        let lx = s.x - tw / 2 - pad;
        lx = Math.max(6, Math.min(lx, W - tw - 2 * pad - 6));
        const ly = Math.min(s.y + r + 11, H - h - 4);
        const rect = { x: lx, y: ly, w: tw + 2 * pad, h, fs, text: n.label, pad };
        if (!hot && collides(rect, placed)) continue;
        placed.push(rect);
        drawLabel(rect, dim);
      }

      raf = requestAnimationFrame(draw);
    }

    function drawLabel(rect, dim) {
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,.5)"; ctx.shadowBlur = 9; ctx.shadowOffsetY = 1;
      ctx.fillStyle = pillBg(dim);
      roundRect(rect.x, rect.y, rect.w, rect.h, 7); ctx.fill();
      ctx.restore();
      ctx.lineWidth = 1; ctx.strokeStyle = cssVar("--border-2");
      roundRect(rect.x, rect.y, rect.w, rect.h, 7); ctx.stroke();
      ctx.font = "600 " + rect.fs + "px Inter, system-ui, sans-serif";
      ctx.fillStyle = dim ? cssVar("--text-faint") : cssVar("--text");
      ctx.fillText(rect.text, rect.x + rect.pad, rect.y + rect.h / 2 + 0.5);
    }
    function labelPriority(n) { return n.type === "center" ? 4 : n.type === "domain" ? 3 : n.featured ? 2 : 1; }
    function collides(r, arr) {
      for (const p of arr) {
        if (r.x < p.x + p.w + 4 && r.x + r.w + 4 > p.x && r.y < p.y + p.h + 4 && r.y + r.h + 4 > p.y) return true;
      }
      return false;
    }

    /* ---- utils ---- */
    function colorFor(e) {
      const a = byId[e.a], b = byId[e.b];
      if (a.type === "center") return b.color || "#9aa6c0";   // spine → domain color, never white
      if (b.type === "center") return a.color || "#9aa6c0";
      return (b.type === "project" ? b : a).color || "#9aa6c0";
    }
    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    function hashT(o) { const s = o.id || "x"; let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997; return h / 997 * 6.28; }
    const _cache = {};
    function cssVar(v) {
      const k = v + themeKey();
      if (_cache[k]) return _cache[k];
      const val = getComputedStyle(document.documentElement).getPropertyValue(v).trim() || "#888";
      return (_cache[k] = val);
    }
    function themeKey() { return document.documentElement.getAttribute("data-theme") || "dark"; }
    function pillBg(dim) { return fade(cssVar("--surface"), dim ? 0.5 : 0.95); }
    function fade(c, a) {
      c = c.trim();
      if (c[0] === "#") {
        let h = c.slice(1);
        if (h.length === 3) h = h.split("").map(x => x + x).join("");
        const n = parseInt(h, 16);
        return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
      }
      if (/^rgb\(/.test(c)) return c.replace(/^rgb\(/, "rgba(").replace(/\)$/, `,${a})`);
      if (/^rgba\(/.test(c)) return c.replace(/,[^,]+\)$/, `,${a})`);
      return c;
    }

    /* ---- interaction ---- */
    function evtPos(e) {
      const r = canvas.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return { x: p.clientX - r.left, y: p.clientY - r.top };
    }
    function setHover(id) {
      hoverId = id;
      activeNeighbors = id ? neighborsOf(id) : new Set();
      canvas.style.cursor = id ? "pointer" : "grab";
    }
    function onMove(e) {
      const p = evtPos(e);
      if (drag) { e.preventDefault(); drag.x = (p.x - cx) / (scale * stretch); drag.y = (p.y - cy) / scale; drag.vx = drag.vy = 0; moved = true; return; }
      const n = pick(p.x, p.y); setHover(n ? n.id : null);
    }
    function onDown(e) {
      const p = evtPos(e); const n = pick(p.x, p.y);
      pointerDown = p; moved = false;
      if (n && n.type !== "center") { drag = n; setHover(n.id); canvas.style.cursor = "grabbing"; }
    }
    function onUp() {
      const wasDrag = drag;
      if (wasDrag) { canvas.style.cursor = "grab"; drag = null; }
      if (!moved && pointerDown) {
        const n = wasDrag || pick(pointerDown.x, pointerDown.y);
        if (n) select(n); else setHover(null);
      }
      pointerDown = null;
    }
    function select(n) {
      setHover(n.id);
      if (n.type === "project" && n.data && opts.onSelectProject) opts.onSelectProject(n.data);
      else if (n.type === "domain" && opts.onSelectDomain) opts.onSelectDomain(n.domain);
      else if (n.type === "center" && opts.onSelectCenter) opts.onSelectCenter();
    }

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", () => { if (!drag) setHover(null); });
    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchend", onUp);

    /* ---- public ---- */
    function reset() { seed(); prewarm(300); }
    function highlightDomain(id) { setHover("dom:" + id); }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    seed(); resize(); prewarm(REDUCED ? 520 : 300);
    canvas.style.cursor = "grab";
    raf = requestAnimationFrame(draw);

    return { reset, highlightDomain, clearHover: () => setHover(null) };
  }

  window.Constellation = { init };
})();
