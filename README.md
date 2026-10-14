# William Cain | Portfolio

An interactive, single-page portfolio built around a **skill constellation**: every
project is a node, grouped into domains and linked by shared tech. Hover to light up a
node's connections, drag nodes around, click any node (or card) for the full details.

No build step, no framework: plain HTML/CSS/vanilla JS. Deploys anywhere static.

## Structure

```
index.html            # markup + the DOM hooks the JS fills
css/styles.css        # design system, light/dark themes, animations
js/data.js            # ← EDIT THIS: all projects, bio, skills, photography
js/constellation.js   # the interactive canvas node-graph
js/main.js            # renders cards/sections from data.js + all interactions
assets/favicon.svg    # icon
assets/img/           # drop photos here
```

## Editing content

Everything lives in **`js/data.js`**; the rest of the site renders from it.

- **Add a project:** copy a block in `projects[]`. Set `domain` to one of the ids in
  `domains[]`, add `featured: true` to make it a large card + a bigger node, and list
  related project ids in `related` to draw cross-links in the constellation.
- **Add real links:** fill a project's `links` array, e.g.
  `links: [{ label: "Repo", href: "https://github.com/you/thing" }]`.
  With none, the modal shows a reminder instead of dead links.
- **Fill the placeholders:** `profile.facts` (city, etc.), `profile.socials` (the `#`
  hrefs), and the `[brackets]` throughout are meant to be replaced.

## Adding photos

1. Drop images in `assets/img/`.
2. In `js/data.js`, give each `photography.shots[]` entry a `src`:
   `{ src: "assets/img/a220.jpg", caption: "Breeze A220 · RDU" }`.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)

```bash
git init && git add . && git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` / root**.

## Notes

- Fully responsive; mobile nav + touch-friendly constellation.
- Respects `prefers-reduced-motion` (drops drift, typing, count-ups, reveals).
- Light/dark toggle persists in `localStorage`.
