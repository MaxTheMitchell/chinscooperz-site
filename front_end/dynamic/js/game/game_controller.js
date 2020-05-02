class GameController{

    DESELECT_VAL = "";
    CHARACTER_HIGHLIGHT_COLOR = "red";
    MOVEMENT_COLOR = "orange";
    TMP_CHARACTER_MOV = 2;

    constructor(board=board.GameBoard(),characters=[],myTurn=true,currently_selected=""){
        this.board = board;
        this.characters = characters;
        this.board.add(characters[0],2,5);
        this.board.add(characters[1],5,5);
        this.currently_selected = currently_selected;
        this.myTurn = myTurn;
    }

    display(){
        if (this.myTurn){
            return this.board.display();
        }
        return this.board.display() + "<div class='opponent_turn'><h1>Opponent's turn</h1></div>"
    }

    cell_clicked(x,y){
        if (this._anything_selected() && this._can_move_to(x,y)){
            this._move_character(x,y);
        }else if (this._is_selectable(x,y)){
            this._select_character(x,y);
        }
    }

    startTurn(){
        this.myTurn = true
    }

    endTurn(){
        this.myTurn = false
    }

    

    _move_character(x,y){
        this.board.move(this.currently_selected.x,this.currently_selected.y,x,y);
        this.board.clear_highting();
        this._deselect();
    }

    _generate_path(moves,end_x,end_y){
        var last_move = moves[moves.length-1];
        if (last_move[0] == end_x && last_move[1] == end_y){
            return moves
        }
        if (Math.abs(last_move[0]-end_x) >= Math.abs(last_move[1]-end_y)){
            if (end_x > last_move[0]){
                moves.push([last_move[0]+1,last_move[1]]);
            }else{
                moves.push([last_move[0]-1,last_move[1]]);
            }
        }else{
            if (end_y > last_move[1]){
                moves.push([last_move[0],last_move[1]+1]);
            }else{
                moves.push([last_move[0],last_move[1]-1]);
            }
        }
        return this._generate_path(moves,end_x,end_y);
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