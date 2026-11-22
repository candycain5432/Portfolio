#!/usr/bin/env python3
"""
scrapbook-photo.py: gets a phone photo ready for the Scrapbook section.

    pip install pillow pillow-heif
    python3 tools/scrapbook-photo.py ~/Pictures/IMG_1234.HEIC trail-day --shape wide

It writes two files to assets/img/scrapbook/:
  trail-day.webp       the small one on the page, already cropped to the shape
  trail-day-full.webp  the big one that opens when someone clicks the photo
and prints the line to paste into `scrapbook.photos` in js/data.js.

It also:
  - reads iPhone HEIC files (most browsers can't show those)
  - converts iPhone colours (Display P3) to normal web colours (sRGB)
  - throws away all the hidden metadata, including the GPS location the phone
    saves in every photo. Worth it for anything taken at home.

Options:
  --shape tall|wide|square   tall is 3:4, wide is 4:3 (default: from the photo)
  --focus X,Y                what to keep in the middle of the crop, as fractions:
                             0,0 is top-left, 1,1 is bottom-right (default 0.5,0.5)
  --zoom Z                   1 = the biggest crop that fits, 0.8 = zoom in a bit
  --crop X0,Y0,X1,Y1         cut the photo down first (fractions), e.g. to leave out
                             a screen or a window; applies to both files
  --caption TEXT             the handwritten caption (goes in the printed line)
"""
import argparse
import io
import os

from PIL import Image, ImageCms, ImageOps

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:  # only needed for .HEIC files
    pillow_heif = None

GRID = {"tall": (540, 720), "wide": (720, 540), "square": (600, 600)}
FULL_LONG_SIDE = 1600
OUT_DIR = "assets/img/scrapbook"


def to_srgb(im):
    """Convert to sRGB using the photo's own colour profile, if it has one."""
    icc = im.info.get("icc_profile")
    im = im.convert("RGB")
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            dst = ImageCms.createProfile("sRGB")
            im = ImageCms.profileToProfile(im, src, dst, outputMode="RGB")
        except ImageCms.PyCMSError:
            pass  # a broken profile: keep the pixels as they are
    return im


def fractions(text, n):
    vals = [float(v) for v in text.split(",")]
    if len(vals) != n or not all(0 <= v <= 1 for v in vals):
        raise SystemExit(f"expected {n} numbers between 0 and 1, got {text!r}")
    return vals


def crop_to_shape(im, shape, fx, fy, zoom):
    W, H = im.size
    tw, th = GRID[shape]
    ratio = tw / th
    # biggest box of this shape that fits, then zoom in
    w = min(W, H * ratio) * zoom
    h = w / ratio
    left = min(max(fx * W - w / 2, 0), W - w)
    top = min(max(fy * H - h / 2, 0), H - h)
    return im.crop((round(left), round(top), round(left + w), round(top + h)))


def save_webp(im, path, quality, max_kb):
    # No exif=, icc_profile= or xmp= arguments: the file goes out with no metadata.
    # Busy photos (grass, leaves, pine straw) come out big, so step the quality
    # down until the file fits under max_kb.
    while True:
        buf = io.BytesIO()
        im.save(buf, "WEBP", quality=quality, method=6)
        if buf.tell() <= max_kb * 1024 or quality <= 50:
            break
        quality -= 5
    with open(path, "wb") as f:
        f.write(buf.getvalue())


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("photo")
    ap.add_argument("name", help="file name to use, e.g. trail-day (no spaces)")
    ap.add_argument("--shape", choices=GRID)
    ap.add_argument("--focus", default="0.5,0.5")
    ap.add_argument("--zoom", type=float, default=1.0)
    ap.add_argument("--crop")
    ap.add_argument("--caption", default="")
    ap.add_argument("--out", default=OUT_DIR)
    a = ap.parse_args()

    if a.photo.lower().endswith((".heic", ".heif")) and pillow_heif is None:
        raise SystemExit("HEIC photos need: pip install pillow-heif")
    if not 0.1 <= a.zoom <= 1:
        raise SystemExit("--zoom should be between 0.1 and 1")

    im = Image.open(a.photo)
    icc = im.info.get("icc_profile")
    im = ImageOps.exif_transpose(im)
    if icc:
        im.info["icc_profile"] = icc
    im = to_srgb(im)

    if a.crop:
        x0, y0, x1, y1 = fractions(a.crop, 4)
        W, H = im.size
        im = im.crop((round(x0 * W), round(y0 * H), round(x1 * W), round(y1 * H)))

    shape = a.shape or ("tall" if im.height > im.width * 1.1 else "wide" if im.width > im.height * 1.1 else "square")
    fx, fy = fractions(a.focus, 2)

    os.makedirs(a.out, exist_ok=True)
    grid = crop_to_shape(im, shape, fx, fy, a.zoom).resize(GRID[shape], Image.LANCZOS)
    full = im.copy()
    full.thumbnail((FULL_LONG_SIDE, FULL_LONG_SIDE), Image.LANCZOS)

    grid_path = f"{a.out}/{a.name}.webp"
    full_path = f"{a.out}/{a.name}-full.webp"
    save_webp(grid, grid_path, 76, max_kb=100)
    save_webp(full, full_path, 80, max_kb=400)

    kb = lambda p: os.path.getsize(p) // 1024
    print(f"wrote {grid_path} ({grid.width}x{grid.height}, {kb(grid_path)} KB) and "
          f"{full_path} ({full.width}x{full.height}, {kb(full_path)} KB)")
    caption = a.caption.replace('"', '\\"')
    print(f'\n      {{ src: "{grid_path}", full: "{full_path}",\n'
          f'        caption: "{caption}", shape: "{shape}", alt: "" }},')


if __name__ == "__main__":
    main()
