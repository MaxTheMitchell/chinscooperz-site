from time import time
class Character:

    def __init__(self,display,move_points=1):
        self.display = display
        self.move_tile = 0
        self.move_down()
        self.move_points = move_points

    def __str__(self):
        return self._static_img_str()

    def move_left(self):
        return self._move(1)

    def move_right(self):
        return self._move(2)

    def move_up(self):
        return self._move(3)

    def move_down(self):
        return self._move(0)

    def _move(self,direction):
        self.move_tile += 1
        if self.move_tile > 2:
            self.move_tile = 0
        self.display.save_section(self.move_tile,direction)
        return str(self)

    def _current_time_in_ms(self):
        return int(time()*1000)

    def _dynamic_img_str(self):
        return "<img height='100' width='100' src='{}?{}'>".format(self.display,self._current_time_in_ms())

    def _static_img_str(self):
        return "<img height='100' width='100' src='{}'>".format(self.display)
