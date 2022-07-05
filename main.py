from PIL import Image, ImageDraw, ImageFont
img = Image.open('cert_empty.png')
d = ImageDraw.Draw(img)
fnt=ImageFont.truetype(r"Lora-BoldItalic.ttf", 90)

text = "Sinan Artun2"
x=img.width / 2
y=img.height / 2

d.text((x+60, y-120), text, font=fnt, fill=(0, 0, 0),)
img.save(text + '.png')