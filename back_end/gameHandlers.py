from back_end import htmlFactory
from back_end.game.manager import GameManager
from back_end.game.game import Game
from back_end.game.player import Player
from back_end.game.game_factories import *
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
        return {
            "/game/check_name": lambda : self._check_name(query_vals),
            "/game/games": lambda : self.GAME_MANAGER.html(),
            "/game/json": lambda : self.GAME_MANAGER.players_game_json(cookies[self.NAME_KEY]),
            "/game/turn/isMine": lambda : self.GAME_MANAGER.is_players_turn_str(cookies[self.NAME_KEY]),
            "/game/turn/opponentHasStarted":lambda :self.GAME_MANAGER.has_opponent_started_str(cookies[self.NAME_KEY]),
            "/game/turn/movesMade": lambda : self.GAME_MANAGER.moves_made_by_opponent(cookies[self.NAME_KEY]),
        }.setdefault(path,lambda : self._root_gets(cookies))()
        
    def handle_post_req(self,path,body,cookies):
        if self._has_no_name(cookies):
            return self._login_page()
        {
            "/game/turn/end": lambda : self.GAME_MANAGER.end_players_turn(cookies[self.NAME_KEY],body),
            "/game/turn/start": lambda : self.GAME_MANAGER.start_players_turn(cookies[self.NAME_KEY]),
            "/game/turn/makeMove": lambda : self.GAME_MANAGER.update_game_controller(cookies[self.NAME_KEY],body),
            "/game/create": lambda : self.GAME_MANAGER.add_game(self.create_test_game(cookies)),
            "/game/join":lambda : self.GAME_MANAGER.join_game(body[self.PLAYER_ONE_KEY],cookies[self.NAME_KEY])
        }.setdefault(path,lambda : None)()
        return " "

    def create_test_game(self,cookies):
        return Game(
            Player(cookies[self.NAME_KEY],True,self.test_game_controller()),
            Player(cookies[self.NAME_KEY],False,self.test_game_controller())
            )
        
    def test_game_controller(self):
        return GameControllerFactory(
            GameBoardFactory(33,22).json,
            PlayerFactory(
                [
                    CharacterFactory("niko",3,2,2).json,
                    CharacterFactory("magic_rat",3,2,4).json,
                    CharacterFactory("chef",3,4,4).json,
                ]
            ).json,
            PlayerFactory(
                [
                    CharacterFactory("grunt1",3,20,2).json,
                    CharacterFactory("grunt2",3,20,4).json,
                    CharacterFactory("sheriff",3,30,4).json,
                ]
            ).json,
            False
        ).json


    def _root_gets(self,cookies):
        if self._has_no_name(cookies):
            return self._login_page()
        elif self._not_in_a_game(cookies):
            return self._lobby_page()
        else:
            return self._game_page(cookies)

    def _check_name(self,query_vals):
        if self.NAME_KEY in query_vals:
            name = query_vals[self.NAME_KEY][0]
        else:
            return "no name entered or you have cookies disable (Enable them coward!)"
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
