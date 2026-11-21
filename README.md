# William Cain | Portfolio

My portfolio site: [williamcain.net](https://williamcain.net).

Plain HTML, CSS and JavaScript. No build step and no framework, so it deploys anywhere static.

## Structure

```
index.html            # page layout; the JS fills in the content
css/styles.css        # all the styling
js/data.js            # ← EDIT THIS: projects, bio, skills, photos
js/figures.js         # the small "cockpit display" drawings on the featured projects
js/main.js            # builds the page from data.js; project panel, search, photo strip
assets/fonts/         # Mona Sans, Source Serif 4 and B612 Mono, self-hosted
assets/img/           # photos (profile-sky.jpg is the hero photo, see below)
tools/sky-plate.py    # makes the hero photo blend into the sky
```

## Editing content

Everything lives in **`js/data.js`** and the rest of the page builds itself from it.
Straight quotes are fine there; the page swaps in curly ones where they belong.

- **Add a project:** copy a block in `projects[]` and set `domain` to one of the ids in
  `domains[]`. It shows up in the searchable "More projects" list, with a filter button
  for its group. Clicking it opens the details panel.
- **Feature a project:** add `featured: true` and it moves up into the grid at the top.
  The first featured project gets the big tile. To give it a drawing, add an entry with
  the same id to `js/figures.js` (projects without one just show without a figure).
- **Status colours** come from the `status` text: Live / Running / Ongoing / Daily driver
  show green, In progress / Concept / Exploring show amber, anything else is plain.
- **Link projects together:** list other project ids in `related`. They show up as
  "See also" links in the details panel.
- **Add real links:** fill a project's `links` array, e.g.
  `links: [{ label: "Repo", href: "https://github.com/you/thing" }]`.

## Adding photos

1. Drop images in `assets/img/` (3:2 landscape, around 1100px wide).
2. Add them to `photography.shots[]` in `js/data.js`:
   `{ src: "assets/img/breeze-a220.jpg", caption: "Breeze A220" }`.

They show up in order in the sideways photo strip. Clicking a photo opens it full screen
(arrow keys or swipe to move between them).

## The hero photo

The blue at the top (and bottom) of the page is a CSS gradient, and
`assets/img/profile-sky.jpg` has had its sky smoothed and its edges matched to that
gradient, so the photo has no visible border. If you swap in a new photo (it needs to be shot against open sky):

```bash
pip install numpy pillow
python3 tools/sky-plate.py assets/img/new-photo.jpg assets/img/profile-sky.jpg
```

It prints nine `--sky-*` colors. Paste them over the ones at the top of
`css/styles.css`.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)

Push to `main`, then in the repo: **Settings → Pages → Source: `main` / root**.
The `CNAME` file points it at williamcain.net.

## Notes

- Press `/` anywhere to jump to the project search. Every project has its own link
  (e.g. `williamcain.net/#p-wall-r`) that opens its details panel.
- Works on phones; the layout changes at 1080, 880, 720 and 640px.
- Respects reduced motion (the radar sweep in the WALL·R figure stops, panels don't slide).
- Fonts: Mona Sans (GitHub), Source Serif 4 (Adobe) and B612 Mono (Airbus / Intactile),
  all under the SIL Open Font License.
