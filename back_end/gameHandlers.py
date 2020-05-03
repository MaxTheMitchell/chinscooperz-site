from back_end import htmlFactory
from back_end import game
import re,http

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
        self.turn = " "
        self.games = []
        
    def handle_req(self,path,query_vals):
        return self._get_resp_str(path,query_vals)

    def _get_resp_str(self,path,query_vals):
        if path == "/game":
            return self._default_html("./front_end/static/html/game_body.html")
        elif path == "/game/login":
            return self._default_html("./front_end/static/html/game_login.html")
        elif path == "/game/loby":
            return self._default_html("./front_end/static/html/game_loby.html")
        elif path == "/game/create":
            self.games.append(game.Game(query_vals['name'][0]))
            return "/game"
        elif path == "/game/games":
            return self._games_html()
        elif path == "/game/turn":
            return str(self.turn != query_vals['name'][0])
        elif path == "/game/turn/end":
            self.turn = query_vals['name'][0]
            return self.turn

    def _default_html(self,file_path):
        return self.HTML_FAC.get_html_sting(open(file_path).read())

    def _games_html(self):
        html = ""
        for game in self.games:
            html += str(game)
        return html
