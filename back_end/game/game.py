import json
from back_end.game.player import Player,NullPlayer

class Game:
    
    def __init__(self,player_one_name,player_two_name="",game_controller={}):
        self.players = Player(player_one_name,False),Player(player_two_name)
        self.game_controller = game_controller

    def __str__(self):
        return self.players[0].name+"'s game"

    def add_player_two(self,player_name):
        self.players[1].name = player_name
    
    def game_controller_json(self):
        return json.dumps(self.game_controller)
    
    def moves_made_by_opponent(self,player_name):
        return self._get_opponent(player_name).moves_made_str()

    def update_moves_made(self,player_name,moves_made):
        self._get_player(player_name).moves_made = moves_made

    def end_turn(self,player_name,game_controller,moves_made):
        self._get_player(player_name).end_turn()
        self.game_controller = game_controller
        self.update_moves_made(player_name,moves_made)

    def start_players_turn(self,player_name):
        self._get_opponent(player_name).start_turn()

    def is_players_turn(self,player_name):
        return self._get_player(player_name).is_my_turn

    def has_opponent_started(self,player_name):
        return self._get_opponent(player_name).is_my_turn

    def has_player_with_name(self,player_name):
        return not isinstance(self._get_player(player_name),NullPlayer)

    def player_one_name(self):
        return self.players[0].name

    def _get_player(self,player_name):
        if player_name == self.players[0].name:
            return self.players[0]
        return self.players[1]

    def _get_opponent(self,player_name):
        if player_name == self.players[0].name:
            return self.players[1]
        return self.players[0]

class NullGame:
     
    def __init__(self,player_name=""):
        self.game_controller = "None"
        self.players = NullPlayer(),NullPlayer()

    def end_turn(self,player_name):
        pass

    def game_controller_json(self):
        return "{}"

    def moves_made_by_opponent(self,moves_made):
        return "[]"

    def set_moves_made(self,moves_made):
        pass

    def is_player_turn(self,player_name):
        return False
    
    def add_player_two(self,player_name):
        pass

    def update_moves_made(self,player_name,moves_made):
        pass


    