from PIL import Image
from sys import argv
from pathlib import Path

sheet = Image.open(argv[1])
save_path = argv[2]+argv[1].split('/')[-1].split('.')[0]
Path(save_path).mkdir()

def img_name(x):
    y = x//3
    if y == 0:
        n = "down"
    elif y == 1:
        n = "left"
    elif y == 2:
        n = "right"
    else:
        n = 'up'
    return n+str(x%3)+".png"

for i,img in enumerate([sheet.crop(
    (
        (i%3)*(sheet.width//3),
        (i//3)*(sheet.height//4),
        ((i%3)+1)*(sheet.width//3),
        ((i//3)+1)*(sheet.height//4)
    )
) for i in range(12) ]):
    img.save(save_path+"/"+img_name(i),"PNG")

