class Game:
    
    def __init__(self,player_one,player_two=""):
        self.player_one = player_one
        self.player_two = player_two

    def __str__(self):
        return self.player_one+"'s game"