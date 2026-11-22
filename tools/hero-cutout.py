#!/usr/bin/env python3
"""
hero-cutout.py: makes the "name behind me" effect at the top of the page.

The hero is three layers: the photo, the giant name, then a copy of the photo with
the open sky made transparent. This script makes that see-through copy. It only
works for photos where the person is standing against open blue sky.

    pip install numpy pillow
    python3 tools/hero-cutout.py original.jpg

Writes assets/img/hero.webp (the photo, cropped) and assets/img/hero-cut.webp
(the cutout). Optional: --crop-bottom 1840 (rows to keep) and --sky-limit 1150
(only sky above this row gets cut out, so clouds near the horizon stay put).
If you change the crop, update the 1152 / 1840 ratio (--ratio) in css/styles.css.
"""
import argparse

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("--crop-bottom", type=int, default=1840)
ap.add_argument("--sky-limit", type=int, default=1150)
ap.add_argument("--out-photo", default="assets/img/hero.webp")
ap.add_argument("--out-cut", default="assets/img/hero-cut.webp")
args = ap.parse_args()

im = ImageOps.exif_transpose(Image.open(args.src)).convert("RGB")
im = im.crop((0, 0, im.width, min(args.crop_bottom, im.height)))
a = np.asarray(im).astype(np.float64)
H, W, _ = a.shape
yy, xx = np.mgrid[0:H, 0:W]
u, v = xx / (W - 1), yy / (H - 1)
R, G, B = a[..., 0], a[..., 1], a[..., 2]
LIMIT = args.sky_limit

# 1. Fit a smooth model of the sky to clearly blue pixels.
sky = (B - R > 50) & (B > 110) & (yy < LIMIT)


def basis(p, q):
    return np.stack([np.ones_like(p), p, q, p * p, p * q, q * q, q ** 3], -1)


A = basis(u[sky], v[sky])
S = np.zeros_like(a)
for ch in range(3):
    y = a[..., ch][sky]
    keep = np.ones_like(y, bool)
    for _ in range(3):
        c, *_ = np.linalg.lstsq(A[keep], y[keep], rcond=None)
        r = np.abs(A @ c - y)
        keep = r < max(4.0, 2.5 * np.median(r[keep]))
    S[..., ch] = basis(u, v) @ c

# 2. Soft alpha from how far each pixel is from the sky colour.
d = np.sqrt(((a - S) ** 2).sum(-1))
alpha = np.clip((d - 14.0) / 38.0, 0, 1)
alpha = alpha * alpha * (3 - 2 * alpha)
alpha[yy >= LIMIT] = 1.0
band = (yy >= LIMIT - 40) & (yy < LIMIT)
alpha[band] = np.maximum(alpha[band], (yy[band] - (LIMIT - 40)) / 40.0)
alpha = np.asarray(Image.fromarray(np.uint8(alpha * 255)).filter(ImageFilter.GaussianBlur(0.6))) / 255.0

# 3. Only sky that touches the edge of the photo is real sky. Anything enclosed by the
#    person (a white shirt in shadow, say) stays solid; only the outline stays soft.
mask = Image.fromarray(np.uint8((alpha < 0.5) * 255)).copy()
for seed in [(0, 0), (W - 1, 0), (W // 2, 0), (0, LIMIT - 60), (W - 1, LIMIT - 60)]:
    if mask.getpixel(seed) == 255:
        ImageDraw.floodfill(mask, seed, 128)
open_sky = np.asarray(Image.fromarray(np.uint8((np.array(mask) == 128) * 255)).filter(ImageFilter.MaxFilter(9))) > 0
alpha = np.where(open_sky, alpha, 1.0)

# 4. Take the sky colour back out of the soft edge pixels so there's no blue fringe:
#    C = a*F + (1 - a)*S  ->  F = S + (C - S) / a
F = np.clip(S + (a - S) / np.maximum(alpha, 0.06)[..., None], 0, 255)
F = np.where(alpha[..., None] > 0.97, a, F)

Image.fromarray(np.dstack([F, alpha * 255]).round().astype(np.uint8), "RGBA").save(args.out_cut, "WEBP", quality=88, method=6)
im.save(args.out_photo, "WEBP", quality=82, method=6)
print(f"wrote {args.out_photo} and {args.out_cut} ({W}x{H}, ratio {H / W:.4f})")
