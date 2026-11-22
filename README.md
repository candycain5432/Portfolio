# William Cain | Portfolio

My portfolio site: [williamcain.net](https://williamcain.net).

Plain HTML, CSS and JavaScript. No build step and no framework, so it deploys anywhere static.

## Structure

```
index.html            # page layout; the JS fills in the content
css/styles.css        # all the styling
js/data.js            # ← EDIT THIS: projects, bio, photos, and all the personal stuff
js/main.js            # builds the page from data.js and runs the interactive bits
assets/fonts/         # Mona Sans, Source Serif 4 (italic), Gochi Hand, B612 Mono
assets/img/           # photos (hero.webp + hero-cut.webp are the top of the page)
assets/og.jpg         # the preview image shown when the link is shared
tools/hero-cutout.py  # makes the "name behind me" effect at the top
```

## Editing content

Everything lives in **`js/data.js`** and the rest of the page builds itself from it.
Straight quotes are fine there; the page swaps in curly ones where they belong.

- **Add a project:** copy a block in `projects[]` and set `domain` to one of the ids in
  `domains[]` (that picks the card colour and the filter button). It shows up under
  "And a bunch more". The first six show straight away; the rest are behind "Show all".
- **Feature a project:** add `featured: true` and it becomes one of the big cards at the top.
- **Status stamps** come from the `status` text: Live / Running / Ongoing / Daily driver
  are green, In progress / Concept / Exploring are orange, anything else is blue.
- **Link projects together:** list other project ids in `related` ("See also" links).
- **Add real links:** fill a project's `links` array, e.g.
  `links: [{ label: "Repo", href: "https://github.com/you/thing" }]`.

The personal sections are also in `data.js`, below the projects:

- `stickers`: the stickers around the top photo (visitors can drag them around).
- `marquee`: the scrolling strip under the top section.
- `learning`: the "How I learn" notebook. Each item has a `via` (the project it came from);
  add `still: true` for something you're still learning. `now` and `next` are the sticky notes.
- `life`: "Off the clock": mountain biking, the philosophy quote, the Red Bull fuel gauge,
  and the polaroid photos (add more to `life.photos` and they join the collage).

## Adding photos

1. Drop images in `assets/img/` (3:2 landscape, around 1100px wide).
2. Add them to `photography.shots[]` in `js/data.js`:
   `{ src: "assets/img/breeze-a220.jpg", caption: "Breeze A220" }`.

They show up in order on the polaroid wall; the first one is the big one. Clicking a photo
opens it full screen (arrow keys or swipe to move between them).

## The top photo

The giant name sits *behind* me in the photo. That's three layers: the photo, the name,
and a copy of the photo with the sky cut out (`hero-cut.webp`) on top. To use a different
photo (it needs to be shot against open sky):

```bash
pip install numpy pillow
python3 tools/hero-cutout.py path/to/new-photo.jpg
```

That writes both `assets/img/hero.webp` and `assets/img/hero-cut.webp`. If the new photo
isn't 1152 × 1840, update `--ratio` (height ÷ width) at the top of the hero section in
`css/styles.css`, and nudge the "me" / "planes, obviously" notes (`.note-me`, `.note-plane`).

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)

Push to `main`, then in the repo: **Settings → Pages → Source: `main` / root**.
The `CNAME` file points it at williamcain.net.

## Notes

- Press `/` anywhere to jump to the project search. Every project has its own link
  (e.g. `williamcain.net/#p-wall-r`).
- Works on phones; the layout changes at 1100, 860, 760, 720 and 420px.
- Respects reduced motion (no marquee, no letter animations, the fuel gauge just shows empty).
- Fonts: Mona Sans (GitHub), Source Serif 4 (Adobe), Gochi Hand (Huerta Tipográfica) and
  B612 Mono (Airbus / Intactile), all under the SIL Open Font License.
