# -*- coding: utf-8 -*-
"""ファビコン/アイコンを生成。 python build-favicon.py"""
from PIL import Image, ImageDraw, ImageFont

thread = (216, 65, 46)
white = (255, 255, 255)
FONT = "C:/Windows/Fonts/yumindb.ttf"

def make(size, pad_ratio=0.0, radius_ratio=0.22, out="icon.png"):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = int(size * pad_ratio)
    r = int(size * radius_ratio)
    d.rounded_rectangle([pad, pad, size - 1 - pad, size - 1 - pad], radius=r, fill=thread)
    f = ImageFont.truetype(FONT, int(size * 0.62))
    d.text((size / 2, size / 2 + size * 0.02), "縁", font=f, fill=white, anchor="mm")
    img.save(out, "PNG")
    print("saved", out, img.size)

make(180, out="assets/img/apple-touch-icon.png")
make(32, out="assets/img/favicon-32.png")
make(192, out="assets/img/icon-192.png")
