from back_end import htmlFactory
import re

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
        self.turn = ""
        
    def handle_req(self,path,query_vals,ip):
        return self._get_resp_str(path,query_vals,ip)

    def _get_resp_str(self,path,query_vals,ip):
        if path == "/game":
            return self.HTML_FAC.get_html_sting(open("./front_end/static/html/game_body.html").read())
        elif path == "/game/turn":
            return str(self.turn != ip)
        elif path == "/game/turn/end":
            self.turn = ip
            return self.turn
