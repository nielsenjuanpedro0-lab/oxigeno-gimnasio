"""Genera versiones WebP de los assets de imagen.

Requiere Pillow:  pip3 install pillow

Los JPEG originales pesaban 3,5 MB en total y se servían a tamaño completo sin
importar el viewport. Cada imagen se emite en dos anchos para poder usar srcset:
el grande cubre desktop con pantalla de alta densidad, el chico cubre mobile.

Los .jpg originales se conservan: son la fuente, y si hay que regenerar con otra
calidad conviene partir de ellos y no de un WebP ya comprimido.
"""

from pathlib import Path

from PIL import Image

ASSETS = Path(__file__).resolve().parent.parent / "src" / "assets"

# nombre -> (ancho grande, ancho chico)
TARGETS = {
    "hero-bg-clean": (1600, 800),
    "gym-1": (1400, 700),
    "gym-2": (1400, 700),
    "gym-3": (1400, 700),
    "gym-4": (1400, 700),
    "gym-5": (1400, 700),
    "gym-floor": (1200, 600),
}

QUALITY = 78

# Imágenes que el layout recorta con object-cover: se recortan antes de comprimir
# para no cargar píxeles que el navegador va a descartar.
CROP_RATIO = {"gym-floor": 4 / 3}


def emit(src: Path, width: int, suffix: str) -> None:
    im = Image.open(src).convert("RGB")

    ratio = CROP_RATIO.get(src.stem)
    if ratio and im.width / im.height < ratio:
        alto = round(im.width / ratio)
        top = (im.height - alto) // 2
        im = im.crop((0, top, im.width, top + alto))

    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    out = src.with_name(f"{src.stem}{suffix}.webp")
    im.save(out, "WEBP", quality=QUALITY, method=6)
    print(f"  {out.name:28} {im.width:>5}x{im.height:<5} {out.stat().st_size / 1024:>7.0f} KB")


def main() -> None:
    antes = despues = 0
    for stem, (big, small) in TARGETS.items():
        src = ASSETS / f"{stem}.jpg"
        if not src.exists():
            print(f"  falta {src.name}, se omite")
            continue
        antes += src.stat().st_size
        print(src.name)
        emit(src, big, "")
        emit(src, small, "@sm")
        despues += (ASSETS / f"{stem}.webp").stat().st_size

    print(f"\nJPEG originales: {antes / 1024 / 1024:.2f} MB")
    print(f"WebP grandes:    {despues / 1024 / 1024:.2f} MB")
    print(f"Reducción:       {(1 - despues / antes) * 100:.0f}%")


if __name__ == "__main__":
    main()
