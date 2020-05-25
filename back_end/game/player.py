import json 

class Player:

    def __init__(self,name,is_my_turn=True,game_conroller={"movesMade":[]}):
        self.name = name
        self.is_my_turn = is_my_turn
        self.game_conroller = game_conroller

    def start_turn(self):
        self.is_my_turn = True

    def end_turn(self):
        self.is_my_turn = False

    def moves_made_str(self):
        return json.dumps(self.game_conroller["movesMade"])

    def game_conroller_str(self):
        return json.dumps(self.game_conroller)

    def set_game_controller(self,game_conroller):
        self.game_conroller = game_conroller

    def clear_moves_made(self):
        self.game_conroller["movesMade"] = []
class NullPlayer:

    def __init__(self,name="null player",moves_made=[]):
        self.name = name
        self.moves_made = moves_made

    def moves_made_str(self):
        return "[]"
    
    def clear_moves_made(self):
        pass