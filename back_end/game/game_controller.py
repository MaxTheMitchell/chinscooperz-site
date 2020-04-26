from back_end.game import board,characterSheetDisplay,character

class GameContoller:

    DESLECT_VAL = ""
    CHARACTER_HIGHLIGHT_COLOR = "red"
    MOVEMENT_COLOR = "orange"
    TMP_CHARACTER_MOV = 2

    def __init__(self,board=board.GameBoard(),charactors=[],currently_selected=""):
        self.board = board
        self.charactors = charactors
        self.board.add(self.charactors[0],2,5)
        self.board.add(self.charactors[1],5,2)
        self.currently_selected = currently_selected

    def display(self):
        return "<div id='game_board' class='game_board'>{}</div>".format(self.board)

    def cell_clicked(self,x,y):
        if self._anything_selected() and self._can_move_to(x,y):
            self._move_character(x,y)
        elif self._is_selectable(x,y):
            self._select_character(x,y)
        return " "

    def _move_character(self,x,y):
        self.board.move(self.currently_selected.x,self.currently_selected.y,x,y)
        self.board.clear_highting()
        self._deselect()

    def _select_character(self,x,y):
        self.currently_selected = self.board.get_cell(x,y)
        self.board.clear_highting()
        self._highlight_in_movement_range(x,y)
        self.board.highlight_cell(x,y,self.CHARACTER_HIGHLIGHT_COLOR)  

    def _highlight_in_movement_range(self,x,y):
        for cell in self.board.get_cells_in_range_of(x,y,self.TMP_CHARACTER_MOV):
            cell.highlight(self.MOVEMENT_COLOR)

    def _is_selectable(self,x,y):
        return isinstance(self.board.get_cell_value(x,y),character.Character)

    def _can_move_to(self,x,y):
        return not self._is_selectable(x,y) and self.board.cell_is_in_range_of_other_cell(
            self.currently_selected,
            self.board.get_cell(x,y),
            self.TMP_CHARACTER_MOV
        )

    def _anything_selected(self):
        return self.currently_selected != self.DESLECT_VAL

    def _deselect(self):
        self.currently_selected = self.DESLECT_VAL