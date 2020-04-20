from PIL import Image
class CharacterSheetDisplay:

    id_count = 0

    def __init__(self,img_path,save_path=""):
        self.save_path = save_path
        self.img = Image.open(img_path)
        self.id = self.id_count
        self.id_count += 1

    def __str__(self):
        return self.get_save_path()[1:]

    def save_section(self,x,y):
        self._save(
            self._crop(x*self._get_character_width(),y*self._get_character_height(),
                (x+1)*self._get_character_width(),(y+1)*self._get_character_height()),
            self.get_save_path()
            )
        return self.get_save_path()

    def get_save_path(self):
        return "{}/{}.png".format(self.save_path,self.id)

    def _save(self,img,save_path):
        img.save(save_path,"PNG")

    def _crop(self,left,top,right,bottom):
        return self.img.crop(
            (left,top,right,bottom)
        )

    def _get_character_width(self):
        return self.img.width//3
    
    def _get_character_height(self):
        return self.img.height//4
        
        