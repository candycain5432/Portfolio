#!/usr/bin/env python3
"""
sky-plate.py: makes the hero photo blend into the page's sky.

The hero background is a plain CSS gradient. This script takes a photo shot
against open sky, smooths the sky (leaving the person and anything else alone),
and nudges the left, right and top edges so they land exactly on that gradient.
It prints the gradient stops to paste into css/styles.css (the --sky-* values).

    pip install numpy pillow
    python3 tools/sky-plate.py assets/img/profile.jpg assets/img/profile-sky.jpg

Only works for photos where the background is mostly sky.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

if len(sys.argv) != 3:
    sys.exit(__doc__)
src, out = sys.argv[1], sys.argv[2]

im = np.asarray(Image.open(src).convert("RGB")).astype(np.float64)
H, W, _ = im.shape
yy, xx = np.mgrid[0:H, 0:W]
u, v = xx / (W - 1), yy / (H - 1)

# 1. Find the sky: clearly blue pixels. Skin, hair, suits and white planes all fail this test.
R, G, B = im[..., 0], im[..., 1], im[..., 2]
sky = (B - R > 55) & (G - R > 18) & (B > 120)


# 2. Fit a smooth 2D quadratic to the sky, per channel, ignoring outliers.
def basis(a, b):
    return np.stack([np.ones_like(a), a, b, a * a, a * b, b * b], -1)


A = basis(u[sky], v[sky])
model = []
for ch in range(3):
    y = im[..., ch][sky]
    keep = np.ones_like(y, bool)
    for _ in range(3):
        c, *_ = np.linalg.lstsq(A[keep], y[keep], rcond=None)
        resid = np.abs(A @ c - y)
        keep = resid < max(3.0, 2.5 * np.median(resid[keep]))
    model.append(c)
S = np.stack([basis(u, v) @ c for c in model], -1)

# 3. The target the browser will draw: 9 gradient stops, linearly interpolated.
N = 9
frac = np.linspace(0, 1, N)
mean_row = S.mean(axis=1)
stops = np.rint(np.stack([np.interp(frac, v[:, 0], mean_row[:, ch]) for ch in range(3)], -1)).astype(int)
T = np.stack([np.interp(v[:, 0], frac, stops[:, ch]) for ch in range(3)], -1)

# 4. Smooth the sky toward the model (keeps a little grain so it doesn't look plastic).
dist = np.sqrt(((im - S) ** 2).sum(-1))
m = np.clip(1 - (dist - 7.0) / 13.0, 0, 1)
m = m * m * (3 - 2 * m)
m = np.asarray(Image.fromarray(np.uint8(m * 255)).filter(ImageFilter.GaussianBlur(1.2))) / 255.0
base = im - m[..., None] * 0.82 * (im - S)

# 5. Pull the left, right and top edges onto the gradient. The bottom edge is left alone.
D = 110.0


def ramp(d):
    t = np.clip(1 - d / D, 0, 1)
    return t * t * (3 - 2 * t)


w = np.maximum.reduce([ramp(xx), ramp(W - 1 - xx), ramp(yy)])[..., None]
plate = base + w * (T[:, None, :] - S)

Image.fromarray(np.clip(np.rint(plate), 0, 255).astype(np.uint8)).save(
    out, quality=90, optimize=True, progressive=True
)

print(f"wrote {out}\n\nPaste into :root in css/styles.css (bottom of the photo first):\n")
for i, s in enumerate(stops[::-1]):
    print(f"  --sky-{i}: #{s[0]:02x}{s[1]:02x}{s[2]:02x};")
