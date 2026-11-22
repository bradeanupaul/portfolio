#!/usr/bin/env python3
"""Copy generated AI assets into public/, remove packshot backgrounds with rembg."""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(
    "/Users/paulbradeanu/.cursor/projects/"
    "Users-paulbradeanu-Desktop-portfolio-elanskin/assets"
)
PUBLIC = ROOT / "public" / "assets"

PRODUCT_MAP = {
    "glow-drops": "product-glow-drops.jpg",
    "cloud-cleanse": "product-cloud-cleanse.jpg",
    "dew-theory": "product-dew-theory.jpg",
    "velvet-barrier": "product-velvet-barrier.jpg",
    "daily-veil-spf-50": "product-daily-veil.jpg",
    "night-reset": "product-night-reset.jpg",
    "soft-ritual": "product-soft-ritual.jpg",
    "calm-current": "product-calm-current.jpg",
    "mist-hour": "product-mist-hour.jpg",
    "pearl-polish": "product-pearl-polish.jpg",
    "linen-veil": "product-linen-veil.jpg",
    "amber-milk": "product-amber-milk.jpg",
    "quiet-pore": "product-quiet-pore.jpg",
    "silk-cushion": "product-silk-cushion.jpg",
    "dawn-balm": "product-dawn-balm.jpg",
    "afterglow-oil": "product-afterglow-oil.jpg",
}

# Lifestyle / texture assignments (reused thoughtfully where unique shots are limited)
LIFESTYLE = {
    "glow-drops": "lifestyle-hand-serum.jpg",
    "cloud-cleanse": "lifestyle-bathroom-shelf.jpg",
    "dew-theory": "lifestyle-hand-serum.jpg",
    "velvet-barrier": "lifestyle-bathroom-shelf.jpg",
    "daily-veil-spf-50": "collection-protectie.jpg",
    "night-reset": "lifestyle-bathroom-shelf.jpg",
    "soft-ritual": "collection-curatare.jpg",
    "calm-current": "lifestyle-hand-serum.jpg",
    "mist-hour": "collection-hidratare.jpg",
    "pearl-polish": "texture-gel-macro.jpg",
    "linen-veil": "collection-protectie.jpg",
    "amber-milk": "collection-curatare.jpg",
    "quiet-pore": "lifestyle-hand-serum.jpg",
    "silk-cushion": "journal-dew-skin.jpg",
    "dawn-balm": "collection-seturi.jpg",
    "afterglow-oil": "lifestyle-hand-serum.jpg",
}

TEXTURE = {
    "glow-drops": "texture-gel-macro.jpg",
    "cloud-cleanse": "texture-gel-macro.jpg",
    "dew-theory": "texture-gel-macro.jpg",
    "velvet-barrier": "texture-cream-macro.jpg",
    "daily-veil-spf-50": "texture-cream-macro.jpg",
    "night-reset": "texture-cream-macro.jpg",
    "soft-ritual": "texture-cream-macro.jpg",
    "calm-current": "texture-gel-macro.jpg",
    "mist-hour": "texture-gel-macro.jpg",
    "pearl-polish": "texture-gel-macro.jpg",
    "linen-veil": "texture-cream-macro.jpg",
    "amber-milk": "texture-cream-macro.jpg",
    "quiet-pore": "texture-gel-macro.jpg",
    "silk-cushion": "texture-cream-macro.jpg",
    "dawn-balm": "texture-cream-macro.jpg",
    "afterglow-oil": "texture-gel-macro.jpg",
}

ROOT_COPIES = {
    "hero-desktop.jpg": "hero-desktop.jpg",
    "hero-mobile.jpg": "hero-mobile.jpg",
    "macro-dropper.jpg": "macro-dropper.jpg",
    "botanical-ingredients.jpg": "botanical-ingredients.jpg",
    "og-elan-skin.jpg": "og.jpg",
}

COLLECTION_COPIES = {
    "ritualul-diminetii.jpg": "collection-seruri.jpg",
    "ritualul-serii.jpg": "collection-hidratare.jpg",
    "lumina-lina.jpg": "collection-seruri.jpg",
    "confort-zilnic.jpg": "collection-curatare.jpg",
}

EDITORIAL_COPIES = {
    "atelier.jpg": "editorial-about-hero.jpg",
    "textura.jpg": "texture-gel-macro.jpg",
    "ordine.jpg": "journal-dew-skin.jpg",
    "texturi.jpg": "texture-cream-macro.jpg",
    "eticheta.jpg": "editorial-packaging.jpg",
    "ritual.jpg": "lifestyle-bathroom-shelf.jpg",
    "cart-empty.jpg": "editorial-cart-empty.jpg",
    "packaging.jpg": "editorial-packaging.jpg",
    "confirmation.jpg": "collection-seturi.jpg",
}


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def copy_file(src_name: str, dest: Path) -> None:
    src = SRC / src_name
    if not src.exists():
        print(f"MISSING {src}")
        return
    ensure_dir(dest.parent)
    shutil.copy2(src, dest)
    print(f"copied {src.name} -> {dest.relative_to(ROOT)}")


def cutout_packshot(src_name: str, dest_png: Path, dest_jpg: Path) -> None:
    src = SRC / src_name
    if not src.exists():
        print(f"MISSING packshot {src}")
        return
    ensure_dir(dest_png.parent)
    raw = Image.open(src).convert("RGBA")
    print(f"rembg {src.name}...")
    cut = remove(raw)
    # Harden soft rembg alpha — milky edges read as a transparent overlay on white.
    r, g, b, a = cut.split()
    a = a.point(lambda v: 255 if v > 40 else (0 if v < 20 else int((v - 20) * (255 / 20))))
    cut = Image.merge("RGBA", (r, g, b, a))
    cut.save(dest_png, "PNG")
    white = Image.new("RGBA", cut.size, (255, 255, 255, 255))
    composed = Image.alpha_composite(white, cut).convert("RGB")
    composed.save(dest_jpg, "JPEG", quality=94)
    print(f"cutout -> {dest_png.relative_to(ROOT)} and {dest_jpg.name}")


def main() -> None:
    ensure_dir(PUBLIC / "products")
    ensure_dir(PUBLIC / "collections")
    ensure_dir(PUBLIC / "editorial")

    for dest_name, src_name in ROOT_COPIES.items():
        copy_file(src_name, PUBLIC / dest_name)

    for dest_name, src_name in COLLECTION_COPIES.items():
        copy_file(src_name, PUBLIC / "collections" / dest_name)

    for dest_name, src_name in EDITORIAL_COPIES.items():
        copy_file(src_name, PUBLIC / "editorial" / dest_name)

    # Extra category campaign copies
    for name in [
        "collection-seruri.jpg",
        "collection-curatare.jpg",
        "collection-hidratare.jpg",
        "collection-protectie.jpg",
        "collection-masti.jpg",
        "collection-seturi.jpg",
    ]:
        copy_file(name, PUBLIC / "collections" / name.replace("collection-", ""))

    for slug, pack in PRODUCT_MAP.items():
        folder = PUBLIC / "products" / slug
        ensure_dir(folder)
        cutout_packshot(pack, folder / "packshot.png", folder / "packshot.jpg")
        copy_file(LIFESTYLE[slug], folder / "lifestyle.jpg")
        copy_file(TEXTURE[slug], folder / "texture.jpg")

    print("done")


if __name__ == "__main__":
    main()
