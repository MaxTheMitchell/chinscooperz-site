class Game:
    
    def __init__(self,player_one,player_two=""):
        self.player_one = player_one
        self.player_two = player_two
        self.current_turn = self.player_one

    def __str__(self):
        return self.player_one+" game"

    def players(self):
        return self.player_one, self.player_two
    
    def add_player_two(self,player):
        self.player_two = player

    def end_turn(self,player):
        if player == self.player_one:
            self.current_turn = self.player_two
        else:
            self.current_turn = self.player_one

    def is_player_turn(self,player):
        return self.current_turn == player

class NullGame:
     
    def __init__(self):
        pass

    def end_turn(self,player):
        pass

    def is_player_turn(self,player):
        return False
    
    def add_player_two(self,player):
        pass

    def players(self):
        pass

class GameManager:

    def __init__(self,games=[]):
        self.games = games

    def add_game(self,game):
        self.games.append(game)

    def join_game(self,player_one,player_two):
        self._players_game(player_one).add_player_two(player_two)

    def is_player_in_a_game(self,player):
        return isinstance(self._players_game(player),Game)
    
    def end_players_turn(self,player):
        self._players_game(player).end_turn(player)

    def is_players_turn(self,player):
        return self._players_game(player).is_player_turn(player)

    def _players_game(self,player):
        for game in self.games:
            if player in game.players():
                return game
        return NullGame()

    def html(self):
        html = ""
        for game in self.games:
            html += "<input type='submit' value='{}' onclick='joinGame(\"{}\")'>".format(game,game.player_one)
        return html


    