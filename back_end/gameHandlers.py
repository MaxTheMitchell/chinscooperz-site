from back_end import htmlFactory
from back_end import game
import re,http,os

class GameHandler:

    HTML_FAC = htmlFactory.HtmlFac(
        open("./front_end/static/html/game_head.html").read(),
        open("./front_end/static/html/header.html").read(),
        open("./front_end/static/html/footer.html").read()
    )
    NAME_KEY = 'name'
    HTML_PATH = "./front_end/static/html/"

    def __init__(self,byte_format='utf-8'):
        self.byte_format = byte_format
        self.turn = " "
        self.games = []
        
    def handle_get_req(self,path,query_vals):
        if path == "/game/games":
            return self._games_html()
        return self._get_resp(path,query_vals)

    def handle_post_req(self,path,body,cookies):
        return self._post_resp(path,body,cookies)

    def _get_resp(self,path,query_vals):
        return self._login_page()

    def _post_resp(self,path,body,cookies):
        if path == "/game/create":
            self.games.append(game.Game(cookies[self.NAME_KEY]))
            return
        if self._has_no_name(cookies):
            return self._login_page()
        elif self._not_in_a_game(cookies):
            return self._lobby_page()
        else:
            return self._game_page(cookies)

    def _has_no_name(self,cookies):
        return not self.NAME_KEY in cookies

    def _not_in_a_game(self,cookies):
        for game in self.games:
            if cookies[self.NAME_KEY] in game.players():
                return False
        return True

    def _login_page(self):
        return self._default_html(self.HTML_PATH+"game_login.html")

    def _lobby_page(self):
        return self._default_html(self.HTML_PATH+"game_lobby.html")

    def _game_page(self,cookies):
        return self._default_html(self.HTML_PATH+"game_body.html")

    def _default_html(self,file_path):
        return self.HTML_FAC.get_html_sting(open(file_path).read())

    def _games_html(self):
        html = ""
        for game in self.games:
            html += "<button onclick=joinGame('{}')>{}</button>".format(game.player_one,game)
        return html
