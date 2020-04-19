class Character:

    def __init__(self,display):
        self.display = display

    def get_html(self):
        return "<img src="+self.display.show_front()+">"
