from back_end.game import board,character,characterSheetDisplay
from back_end import htmlFactory

class GameHandler:

    CHARACTER_SHEET_PATH = "./front_end/static/imgs/character_sheets"
    SAVE_PATH = "./front_end/static/imgs/game/tmp"
    HTML_FAC = htmlFactory.HtmlFac(
        open("./front_end/static/html/game_head.html").read(),
        open("./front_end/static/html/header.html").read(),
        open("./front_end/static/html/footer.html").read()
    )

    def __init__(self,byte_format='utf-8'):
        self.byte_format = byte_format
        self.game_board = board.GameBoard()
        self.rat = character.Character(
            characterSheetDisplay.CharacterSheetDisplay(self.CHARACTER_SHEET_PATH+"/magic_rat.png",self.SAVE_PATH)
            )
        self.game_board.add(self.rat,2,2)

    def handle_req(self,path):
        return bytes(self._get_response_str(path),self.byte_format)

    def _get_response_str(self,path):
        if path == "/game":
            return self._setup()
        elif path == "/game/move":
            return self._move()
        elif path == "/game/update":
            return self._update()

    def _setup(self):
        return self.HTML_FAC.get_html_sting("<div id='game_board' class='game_board'>{}</div>".format(self.game_board))

    def _move(self):
        self.game_board.move(2,2,5,7)
        return " "

    def _update(self):
        return str(self.game_board)