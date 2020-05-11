from back_end import htmlFactory,game

class GameHandler:

    HTML_FAC = htmlFactory.HtmlFac(
        open("./front_end/static/html/game_head.html").read(),
        open("./front_end/static/html/header.html").read(),
        open("./front_end/static/html/footer.html").read()
    )
    NAME_KEY = 'name'
    PLAYER_ONE_KEY = 'player_1'
    HTML_PATH = "./front_end/static/html/"
    GAME_MANAGER = game.GameManager()

    def __init__(self,byte_format='utf-8'):
        self.byte_format = byte_format
        self.turn = " "
        
    def handle_get_req(self,path,query_vals,cookies):
        if self._has_no_name(cookies):
            return self._login_page()
        elif path == "/game/games":
            return self.GAME_MANAGER.html()
        elif self._not_in_a_game(cookies):
            return self._lobby_page()
        elif path == "/game/turn/is_mine":
            return str(self.GAME_MANAGER.is_players_turn(cookies[self.NAME_KEY]))
        else:
            return self._game_page(cookies)

    def handle_post_req(self,path,body,cookies):
        if self._has_no_name(cookies):
            return self._login_page()
        elif  path == "/game/turn/end":
            self.GAME_MANAGER.end_players_turn(cookies[self.NAME_KEY])
        elif path == "/game/create":
            self.GAME_MANAGER.add_game(game.Game(cookies[self.NAME_KEY]))
        elif path == "/game/join":
            self.GAME_MANAGER.join_game(body[self.PLAYER_ONE_KEY],cookies[self.NAME_KEY])
        return " "

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
