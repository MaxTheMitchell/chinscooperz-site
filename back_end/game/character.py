class Character:

    CHARACTER_SHEET_PATH = "../../font_end/static/imgs/cha"

    def __init__(self,name):
        self.name = name
        self.character_sheet = self.CHARACTER_SHEET_PATH + name + ".png"

    def html_rep(self):
        return self.character_sheet

from PIL import Image
class CharacterDisplay:

    id_count = 0

    def __init__(self,img_path,save_path=""):
        self.save_path = save_path
        self.img = Image.open(img_path)
        self.character_width = self.img.width//3
        self.character_height = self.img.height//4
        self.id = self.id_count
        self.id_count += 1

    def show_front(self):
        self._save(
            self._crop(1,0),self.save_path
        )

    def _save(self,img,save_path):
        img.save("{}/{}.png".format(save_path,self.id),"PNG")

    def _crop(self,x,y):
        return self.img.crop(
            (x*self.character_width,y*self.character_height,
            x*self.character_width*(x+1),self.character_height*(y+1))
        )
        