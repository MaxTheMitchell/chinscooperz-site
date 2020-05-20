import json 

class Player:

    def __init__(self,name,is_my_turn=True,moves_made=[]):
        self.name = name
        self.is_my_turn = is_my_turn
        self.moves_made = moves_made

    def start_turn(self):
        self.clear_moves_made()
        self.is_my_turn = True

    def end_turn(self):
        self.is_my_turn = False

    def moves_made_str(self):
        return json.dumps(self.moves_made)

    def clear_moves_made(self):
        self.moves_made = []

class NullPlayer:

    def __init__(self,name="null player",moves_made=[]):
        self.name = name
        self.moves_made = moves_made

    def moves_made_str(self):
        return "[]"
    
    def clear_moves_made(self):
        pass