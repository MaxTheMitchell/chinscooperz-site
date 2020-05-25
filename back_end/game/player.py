import json,copy

class Player:

    def __init__(self,name,is_my_turn=True,game_controller={"movesMade":[]}):
        self.name = name
        self.is_my_turn = is_my_turn
        self.game_controller = game_controller

    def start_turn(self):
        self.is_my_turn = True

    def end_turn(self):
        self.is_my_turn = False

    def moves_made_str(self):
        return json.dumps(self.game_controller["movesMade"])

    def game_controller_str(self):
        return json.dumps(self.game_controller)

    def set_game_controller(self,game_controller):
        self.game_controller = game_controller

    def clear_moves_made(self):
        self.game_controller["movesMade"] = []

    def swap_game_controller_players(self):
        new_opponent = copy.copy(self.game_controller["player"])
        self.game_controller["player"] = self.game_controller["opponent"]
        self.game_controller["opponent"] = new_opponent

class NullPlayer:

    def __init__(self,name="null player",moves_made=[]):
        self.name = name
        self.moves_made = moves_made

    def moves_made_str(self):
        return "[]"
    
    def clear_moves_made(self):
        pass