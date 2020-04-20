from back_end.game import board,character,characterSheetDisplay

class GameWorkflow:

    CHARACTER_SHEET_PATH = "./front_end/static/imgs/character_sheets"
    SAVE_PATH = "./front_end/static/imgs/game/tmp"

    def __init__(self):
        self.game_board = board.GameBoard()
        self.rat = character.Character(
            characterSheetDisplay.CharacterSheetDisplay(self.CHARACTER_SHEET_PATH+"/magic_rat.png",self.SAVE_PATH)
            )
        self.game_board.add_to_map(self.rat,2,2)

    def run(self):
        return str(self.game_board)

    def move(self):
        self.rat.move_right()
        return str(self.rat.display)