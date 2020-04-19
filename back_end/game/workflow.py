from back_end.game import board,character,characterDisplay

class GameWorkflow:

    CHARACTER_SHEET_PATH = "./front_end/static/imgs/character_sheets"
    SAVE_PATH = "./front_end/static/imgs/game/tmp"

    def __init__(self):
        self.game_board = board.GameBoard()
        rat = character.Character(
            characterDisplay.CharacterDisplay(self.CHARACTER_SHEET_PATH+"/magic_rat.png",self.SAVE_PATH)
            )
        self.game_board.add_to_map(rat.get_html(),2,2)

    def run(self):
        return self.game_board.get_html_rep()
