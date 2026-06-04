#!/usr/bin/env python3
"""Regenerate favicon, PWA, OG, and Next.js app icons from the brand mobile mark."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"
SRC = PUBLIC / "assets" / "logo" / "logoblackmobile-transaparent.png"
OG_LOGO = PUBLIC / "assets" / "logo" / "logowhitetext-transparent.png"
NAVY = (17, 17, 34)


def fit_square(img: Image.Image, size: int, bg: tuple[int, int, int, int] | None = None) -> Image.Image:
    w, h = img.size
    scale = min(size / w, size / h)
    nw, nh = int(w * scale), int(h * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    if bg is None:
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    else:
        canvas = Image.new("RGBA", (size, size), bg)
    canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2), resized)
    return canvas


def save_rgb(img: Image.Image, path: Path) -> None:
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    img.save(path, optimize=True)


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    og_logo = Image.open(OG_LOGO).convert("RGBA")

    icon512 = fit_square(src, 512)
    icon512.save(PUBLIC / "pwa-icon-512.png", optimize=True)
    icon512.resize((192, 192), Image.Resampling.LANCZOS).save(PUBLIC / "pwa-icon-192.png", optimize=True)

    save_rgb(icon512.resize((32, 32), Image.Resampling.LANCZOS), PUBLIC / "favicon-32x32.png")
    save_rgb(icon512.resize((16, 16), Image.Resampling.LANCZOS), PUBLIC / "favicon-16x16.png")

    apple = icon512.resize((180, 180), Image.Resampling.LANCZOS)
    apple.save(PUBLIC / "apple-icon.png", optimize=True)
    apple.save(APP / "apple-icon.png", optimize=True)

    mask_inner = fit_square(src, 410, bg=(*NAVY, 255))
    maskable = Image.new("RGBA", (512, 512), (*NAVY, 255))
    maskable.paste(mask_inner, (51, 51), mask_inner)
    maskable.save(PUBLIC / "pwa-icon-maskable-512.png", optimize=True)

    ico_imgs = [
        icon512.resize((32, 32), Image.Resampling.LANCZOS).convert("RGBA"),
        icon512.resize((16, 16), Image.Resampling.LANCZOS).convert("RGBA"),
    ]
    ico_imgs[0].save(PUBLIC / "favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])

    og = Image.new("RGB", (1200, 630), NAVY)
    lw, lh = og_logo.size
    scale = min(900 / lw, 280 / lh)
    nw, nh = int(lw * scale), int(lh * scale)
    logo = og_logo.resize((nw, nh), Image.Resampling.LANCZOS)
    og.paste(logo, ((1200 - nw) // 2, (630 - nh) // 2), logo)
    og.save(PUBLIC / "og-image.png", optimize=True)

    # Next.js metadata icon (used for favicon / some install UIs)
    app_icon = icon512.resize((512, 512), Image.Resampling.LANCZOS)
    app_icon.save(APP / "icon.png", optimize=True)

    print("Generated brand icons in public/ and src/app/")


if __name__ == "__main__":
    main()
