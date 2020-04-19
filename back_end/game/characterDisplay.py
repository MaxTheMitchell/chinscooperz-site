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
        self._save(self._crop(1,0),self._get_save_str())
        return self._get_save_str()

    def _get_save_str(self):
        return "{}/{}.png".format(self.save_path,self.id)

    def _save(self,img,save_path):
        img.save(save_path,"PNG")

    def _crop(self,x,y):
        return self.img.crop(
            (x*self.character_width,y*self.character_height,
            x*self.character_width*(x+1),self.character_height*(y+1))
        )
        