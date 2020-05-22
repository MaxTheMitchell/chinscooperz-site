from back_end import htmlFactory
from back_end.game.manager import GameManager
from back_end.game.game import Game
import re

class GameHandler:

    HTML_FAC = htmlFactory.HtmlFac(
        open("./front_end/static/html/game_head.html").read(),
        open("./front_end/static/html/header.html").read(),
        open("./front_end/static/html/footer.html").read()
    )
    NAME_KEY = 'name'
    PLAYER_ONE_KEY = 'player_1'
    HTML_PATH = "./front_end/static/html/"
    GAME_MANAGER = GameManager()

    def __init__(self,byte_format='utf-8'):
        self.byte_format = byte_format
        self.turn = " "
        self.taken_names = []
        
    def handle_get_req(self,path,query_vals,cookies):
        if path == "/game/check_name":
            return self._check_name(query_vals[self.NAME_KEY][0])
        elif path == "/game/games":
            return self.GAME_MANAGER.html()
        elif path == "/game/json":
            return self.GAME_MANAGER.players_game_json(cookies[self.NAME_KEY])
        elif path == "/game/turn/isMine":
            return self.GAME_MANAGER.is_players_turn_str(cookies[self.NAME_KEY])
        elif path == "/game/turn/opponentHasStarted":
            return self.GAME_MANAGER.has_opponent_started_str(cookies[self.NAME_KEY])
        elif path == "/game/turn/movesMade":
            return self.GAME_MANAGER.moves_made_by_opponent(cookies[self.NAME_KEY])
        elif self._has_no_name(cookies):
            return self._login_page()
        elif self._not_in_a_game(cookies):
            print("worked")
            return self._lobby_page()
        else:
            return self._game_page(cookies)

    def handle_post_req(self,path,body,cookies):
        if self._has_no_name(cookies):
            return self._login_page()
        elif  path == "/game/turn/end":
            self.GAME_MANAGER.end_players_turn(cookies[self.NAME_KEY],body["gameController"],body["movesMade"])
        elif path == "/game/turn/start":
            self.GAME_MANAGER.start_players_turn(cookies[self.NAME_KEY])
        elif path == "/game/turn/movesMade":
            self.GAME_MANAGER.update_moves_made(cookies[self.NAME_KEY],body)
        elif path == "/game/create":
            self.GAME_MANAGER.add_game(Game(cookies[self.NAME_KEY]))
        elif path == "/game/join":
            self.GAME_MANAGER.join_game(body[self.PLAYER_ONE_KEY],cookies[self.NAME_KEY])
        return " "

    def _check_name(self,name):
        if name in self.taken_names:
            return "The name {} is already taken buster!".format(name)
        elif re.match('.*[^\w\s]',name):
            return "Your name uses an invalid character buster!"
        self.taken_names.append(name)
        return "valid" 

    def _is_turn_path(self,path):
        return path.split('/')[1] == 'turn'

    def _has_no_name(self,cookies):
        return not self.NAME_KEY in cookies

    def _not_in_a_game(self,cookies):
        return not self.GAME_MANAGER.is_player_in_a_game(cookies[self.NAME_KEY])

    def _login_page(self):
        return self._default_html(self.HTML_PATH+"game_login.html")

    def _lobby_page(self):
        return self._default_html(self.HTML_PATH+"game_lobby.html")

    def _game_page(self,cookies):
        return self._default_html(self.HTML_PATH+"game_body.html")

    def _default_html(self,file_path):
        return self.HTML_FAC.get_html_sting(open(file_path).read())
