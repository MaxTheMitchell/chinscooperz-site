import json
class Game:
    
    def __init__(self,player_one,player_two="",game_controller=None,moves_made=None):
        self.player_one = player_one
        self.player_two = player_two
        self.current_turn = self.player_one
        self.game_controller = game_controller
        self.moves_made = moves_made

    def __str__(self):
        return self.player_one+"'s game"
    
    def game_controller_json(self):
        return json.dumps(self.game_controller)
        
    def moves_made_json(self):
        return json.dumps(self.moves_made)

    def players(self):
        return self.player_one, self.player_two
    
    def add_player_two(self,player):
        self.player_two = player

    def end_turn(self,player,game_controller,moves_made):
        if player == self.player_one:
            self.current_turn = self.player_two
        else:
            self.current_turn = self.player_one
        self.game_controller = game_controller
        self.moves_made = moves_made

    def is_player_turn(self,player):
        return self.current_turn == player

class NullGame:
     
    def __init__(self):
        self.game_controller = "None"
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
    
    def players_game_json(self,player):
        return self._players_game(player).game_controller_json()

    def players_moves_made(self,player):
        return self._players_game(player).moves_made_json()
    
    def end_players_turn(self,player,game_controller,moves_made):
        self._players_game(player).end_turn(player,game_controller,moves_made)

    def is_players_turn(self,player):
        if self._players_game(player).is_player_turn(player):
            return self.players_moves_made(player)
        return "NotYourTurn"

    def _players_game(self,player):
        for game in self.games:
            if player in game.players():
                return game
        return NullGame()

    def html(self):
        html = ""
        for game in self.games:
            html += '<input type="submit" value="{}" onclick="joinGame(\'{}\')">'.format(game,game.player_one)
        return html


    