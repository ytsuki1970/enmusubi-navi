# -*- coding: utf-8 -*-
"""OGP画像（1200x630 PNG）を生成。游明朝・游ゴシックを使用。
   再生成: python build-ogp.py  → assets/img/ogp.png"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
paper = (251, 245, 234)
ink = (40, 33, 28)
inksoft = (92, 80, 70)
thread = (216, 65, 46)
line = (226, 213, 192)
white = (255, 255, 255)

FONTS = "C:/Windows/Fonts/"
mincho_big = ImageFont.truetype(FONTS + "yumindb.ttf", 96)      # 縁
title = ImageFont.truetype(FONTS + "yumindb.ttf", 90)           # 縁結びナビ
sub = ImageFont.truetype(FONTS + "YuGothM.ttc", 38, index=0)
small = ImageFont.truetype(FONTS + "YuGothM.ttc", 26, index=0)
latin = ImageFont.truetype(FONTS + "YuGothB.ttc", 30, index=0)
kanji = ImageFont.truetype(FONTS + "yumindb.ttf", 150)          # medallion 縁

img = Image.new("RGB", (W, H), paper)
d = ImageDraw.Draw(img)

# 上部の赤い糸バー
d.rectangle([0, 0, W, 12], fill=thread)
# 内枠
d.rectangle([26, 30, W - 26, H - 26], outline=line, width=2)

# メダリオン（赤い円に白い「縁」）
cx, cy, r = 250, 330, 150
d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=thread)
d.ellipse([cx - r + 16, cy - r + 16, cx + r - 16, cy + r - 16], outline=(255, 255, 255), width=2)
d.text((cx, cy + 6), "縁", font=kanji, fill=white, anchor="mm")

# 右側テキスト
x = 460
d.text((x, 120), "EN-MUSUBI NAVI", font=latin, fill=thread)
d.text((x, 165), "縁結びナビ", font=title, fill=ink)
# タイトル下の赤いアクセント線
d.rectangle([x + 2, 285, x + 122, 291], fill=thread)
d.text((x, 320), "全国47都道府県の公的婚活イベントを", font=sub, fill=inksoft)
d.text((x, 372), "ひとつの場所に。", font=sub, fill=inksoft)
d.text((x, 450), "自治体・県の結婚支援センター・公的団体が主催", font=small, fill=inksoft)

img.save("assets/img/ogp.png", "PNG")
print("saved assets/img/ogp.png", img.size)
