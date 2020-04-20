from PIL import Image
class CharacterSheetDisplay:

    def __init__(self,img_path,save_path=""):
        self.save_path = save_path
        self.img = Image.open(img_path)

    def __str__(self):
        return self.get_save_path()[1:]

    def save_section(self,x,y):
        self._save(
            self._crop(self._select_left(x),self._select_top(y),
                self._select_right(x),self._select_bottom(y)),
            self.get_save_path()
            )
        return self.get_save_path()

    def get_save_path(self):
        return "{}/{}.png".format(self.save_path,self._get_id())

    def _select_bottom(self,y):
        return self._select_top(y) + self._get_character_height()

    def _select_top(self,y):
        return y*self._get_character_height()

    def _select_left(self,x):
        return x*self._get_character_width()

    def _select_right(self,x):
        return self._select_left(x) + self._get_character_width()

    def _save(self,img,save_path):
        img.save(save_path,"PNG")

    def _crop(self,left,top,right,bottom):
        return self.img.crop((left,top,right,bottom))

    def _get_character_width(self):
        return self.img.width//3
    
    def _get_character_height(self):
        return self.img.height//4
        
    def _get_id(self):
        return id(self)
        