# William Cain | Portfolio

My portfolio site: [williamcain.net](https://williamcain.net).

Plain HTML, CSS and JavaScript. No build step and no framework, so it deploys anywhere static.

## Structure

```
index.html            # page layout; the JS fills in the content
css/styles.css        # all the styling
js/data.js            # ← EDIT THIS: projects, bio, skills, photos
js/figures.js         # the small drawings next to the featured projects
js/main.js            # builds the page from data.js; project list + photo viewer
assets/fonts/         # Source Serif 4 and B612 Mono, self-hosted
assets/img/           # photos (profile-sky.jpg is the hero photo, see below)
tools/sky-plate.py    # makes the hero photo blend into the sky
```

## Editing content

Everything lives in **`js/data.js`** and the rest of the page builds itself from it.
Straight quotes are fine there; the page swaps in curly ones where they belong.

- **Add a project:** copy a block in `projects[]` and set `domain` to one of the ids in
  `domains[]`. It shows up in the "Everything else" list under that group.
- **Feature a project:** add `featured: true` and it moves up into the big list at the top.
  To give it a drawing, add an entry with the same id to `js/figures.js` (projects
  without one just show without a figure).
- **Link projects together:** list other project ids in `related`. They show up as
  "See also" links that jump to (and open) that project.
- **Add real links:** fill a project's `links` array, e.g.
  `links: [{ label: "Repo", href: "https://github.com/you/thing" }]`.

## Adding photos

1. Drop images in `assets/img/` (3:2 landscape, around 1100px wide).
2. Add them to `photography.shots[]` in `js/data.js`:
   `{ src: "assets/img/breeze-a220.jpg", caption: "Breeze A220" }`.

The first shot is the big one at the top. The grid fills its last row on its own, so any
number of photos works. Clicking a photo opens it full screen (arrow keys or swipe to move
between them).

## The hero photo

The blue at the top of the page is a CSS gradient, and `assets/img/profile-sky.jpg` has
had its sky smoothed and its edges matched to that gradient, so the photo has no visible
border. If you swap in a new photo (it needs to be shot against open sky):

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

- Works on phones; the layout changes at 1080, 880, 720 and 640px.
- Respects reduced motion (the radar sweep in the WALL·R figure stops).
- Fonts: Source Serif 4 (Adobe) and B612 Mono (Airbus / Intactile), both under the SIL
  Open Font License.
