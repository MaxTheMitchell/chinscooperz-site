class GameController{

    DESELECT_VAL = "";
    CHARACTER_HIGHLIGHT_COLOR = "red";
    MOVEMENT_COLOR = "orange";
    TMP_CHARACTER_MOV = 2;

    constructor(board=board.GameBoard(),characters=[],currently_selected=""){
        this.board = board;
        this.characters = characters;
        this.board.add(characters[0],2,5);
        this.board.add(characters[1],5,5);
        this.currently_selected = currently_selected;
    }

    display(){
        return this.board.display();
    }

    cell_clicked(x,y){
        if (this._anything_selected() && this._can_move_to(x,y)){
            this._move_character(x,y);
        }else if (this._is_selectable(x,y)){
            this._select_character(x,y);
        }
    }

    _move_character(x,y){
        this.board.move(this.currently_selected.x,this.currently_selected.y,x,y);
        this.board.clear_highting();
        this._deselect();
    }

    _select_character(x,y){
        this.currently_selected = this.board.get_cell(x,y);
        this.board.clear_highting();
        this._highlight_in_movement_range(x,y);
        this.board.highlight_cell(x,y,this.CHARACTER_HIGHLIGHT_COLOR);
    }

    _highlight_in_movement_range(x,y){
       this.board.get_cells_in_range_of(x,y,this.TMP_CHARACTER_MOV).forEach(cell => {
           cell.highlight(this.MOVEMENT_COLOR);
       });
    }
            

    _is_selectable(x,y){
        return this.board.get_cell_value(x,y) instanceof Character;
    }

    _can_move_to(x,y){
        return (!this._is_selectable(x,y) && this.board.cell_is_in_range_of_other_cell(
            this.currently_selected,
            this.board.get_cell(x,y),
            this.TMP_CHARACTER_MOV
        ));
    }

    _anything_selected(){
        return this.currently_selected != this.DESELECT_VAL;
    }

    _deselect(){
        this.currently_selected = this.DESELECT_VAL;
    }
}