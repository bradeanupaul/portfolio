#!/usr/bin/env python3
"""Build pure-white studio packshots without fake pedestal shadows.

Subject fills ~80% of frame height on RGB(255,255,255).
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "public" / "assets" / "products"
WHITE = (255, 255, 255, 255)


def place(product: Image.Image, canvas_w: int, canvas_h: int, scale: float = 0.82) -> Image.Image:
    canvas = Image.new("RGBA", (canvas_w, canvas_h), WHITE)
    pw, ph = product.size
    target_h = int(canvas_h * scale)
    ratio = target_h / ph
    tw, th = max(1, int(pw * ratio)), target_h
    if tw > int(canvas_w * 0.92):
        tw = int(canvas_w * 0.92)
        th = max(1, int(ph * (tw / pw)))
    resized = product.convert("RGBA").resize((tw, th), Image.Resampling.LANCZOS)
    x = (canvas_w - tw) // 2
    y = (canvas_h - th) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def main() -> None:
    for folder in sorted(PRODUCTS.iterdir()):
        if not folder.is_dir():
            continue
        src = folder / "packshot.png"
        if not src.exists():
            src = folder / "packshot.jpg"
        if not src.exists():
            print("skip", folder.name)
            continue
        pack = Image.open(src).convert("RGBA")

        front = place(pack, 1200, 1500, scale=0.82)
        front.convert("RGB").save(folder / "front.jpg", "JPEG", quality=94)

        listing = place(pack, 1200, 1200, scale=0.84)
        listing.convert("RGB").save(folder / "packshot.jpg", "JPEG", quality=94)

        angle = place(pack, 1200, 1500, scale=0.74)
        # slight vertical bias for alternate framing without shadow
        angle_canvas = Image.new("RGBA", (1200, 1500), WHITE)
        pw, ph = pack.size
        th = int(1500 * 0.74)
        tw = max(1, int(pw * (th / ph)))
        resized = pack.resize((tw, th), Image.Resampling.LANCZOS)
        x = (1200 - tw) // 2
        y = int((1500 - th) // 2 + 40)
        angle_canvas.alpha_composite(resized.convert("RGBA"), (x, y))
        angle_canvas.convert("RGB").save(folder / "angle.jpg", "JPEG", quality=94)

        w, h = pack.size
        box = (int(w * 0.18), int(h * 0.04), int(w * 0.82), int(h * 0.7))
        detail_src = pack.crop(box)
        detail = place(detail_src, 1200, 1500, scale=0.88)
        detail.convert("RGB").save(folder / "detail.jpg", "JPEG", quality=94)

        print("ok", folder.name)


if __name__ == "__main__":
    main()
