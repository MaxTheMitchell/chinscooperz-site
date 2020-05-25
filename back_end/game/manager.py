from back_end.game.game import Game,NullGame

class GameManager:

    def __init__(self,games=[]):
        self.games = games

    def add_game(self,game):
        self.games.append(game)

    def join_game(self,player_one,player_two):
        self._players_game(player_one).add_player_two(player_two)

    def is_player_in_a_game(self,player_name):
        return isinstance(self._players_game(player_name),Game)

    def is_players_turn_str(self,player_name):
        return str(self._players_game(player_name).is_players_turn(player_name))
       
    def has_opponent_started_str(self,player_name):
        return str(self._players_game(player_name).has_opponent_started(player_name))
    
    def players_game_json(self,player_name):
        return self._players_game(player_name).game_controller_json(player_name)

    def moves_made_by_opponent(self,player_name):
        return self._players_game(player_name).moves_made_by_opponent(player_name)
    
    def end_players_turn(self,player,game_controller):
        self._players_game(player).end_turn(player,game_controller)

    def start_players_turn(self,player_name):
        self._players_game(player_name).start_players_turn(player_name)

    def update_game_controller(self,player_name,game_controller):
        self._players_game(player_name).update_game_controller(player_name,game_controller)

    def _players_game(self,player_name):
        for game in self.games:
            if game.has_player_with_name(player_name):
                return game
        return NullGame()

    def html(self):
        html = " "
        for game in self.games:
            html += '<input type="submit" value="{}" onclick="joinGame(\'{}\')">'.format(game,game.player_one_name())
        return html