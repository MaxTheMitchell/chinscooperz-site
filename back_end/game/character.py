class Character:

    def __init__(self,display):
        self.display = display
        self.move_tile = 0

    def move_left(self):
        return self._move(1)

    def move_right(self):
        return self._move(2)

    def move_up(self):
        return self._move(3)

    def move_down(self):
        return self._move(0)

    def get_html(self,save_path):
        return "<img  height='100' width='100' src="+self.display.get_save_path()+">"

    def _move(self,direction):
        self.move_tile += 1
        if self.move_tile > 2:
            self.move_tile = 0
        return self.get_html(self.display.save_section(self.move_tile,direction))
