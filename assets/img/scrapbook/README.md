# Scrapbook photos

Photos for the **Scrapbook** section of the site live in this folder. Each photo has two files:
`name.webp` (the small, cropped one on the page) and `name-full.webp` (the big one that opens
when someone clicks it).

## Adding a photo (the easy way)

From the top folder of the repo:

```bash
pip install pillow pillow-heif
python3 tools/scrapbook-photo.py ~/Pictures/IMG_1234.HEIC trail-day --shape wide --caption "trail day"
```

That makes both files here and prints a line to paste into `scrapbook.photos` in
`js/data.js`. Fill in the `alt` text (a short description of the photo for screen readers).

It also reads iPhone HEIC photos, fixes iPhone colours for the web, and **removes the GPS
location** your phone saves inside every photo, which matters for anything taken at home.

- `--shape` is `tall` (3:4), `wide` (4:3) or `square`.
- `--focus 0.5,0.3` moves the crop (0,0 is top-left, 1,1 is bottom-right).
- `--zoom 0.8` zooms in a bit.

## Adding a photo (by hand)

Drop a JPG, PNG or WebP in this folder and add a line to `scrapbook.photos`:

```js
{ src: "assets/img/scrapbook/trail-day.jpg", caption: "trail day", shape: "wide", alt: "..." },
```

Without `full`, the same file is used for both. Keep it around 1600px on the long side, use
names without spaces, and avoid HEIC (only Safari can show it).

A line with an empty `src` shows up as an empty "photo goes here" frame.
