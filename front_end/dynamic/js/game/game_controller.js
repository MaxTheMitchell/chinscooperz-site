class GameController{

    DESELECT_VAL = "";
    CHARACTER_HIGHLIGHT_COLOR = "red";
    MOVEMENT_COLOR = "orange";
    TMP_CHARACTER_MOV = 10;

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

    _update(){
        document.getElementById('game_board').innerHTML = this.display();
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
        this._move_along_path(this._generate_path([this.currently_selected.position()],x,y));
        this.board.clear_highting();
        this._deselect();
        this._update();
    }

    _move_along_path(path,speed=300){
        var interval = setInterval(move_a_space,speed)
        var self = this;
        function move_a_space(){
            this.board.move(path[0][0],path[0][1],path[1][0],path[1][1]);
            self._update();
            path.shift();
            if (path.length <2){
                clearInterval(interval);
            }
        }
    }

    _generate_path(moves,end_x,end_y){
        var [start_x,start_y] = moves[moves.length-1];
        if (start_x == end_x && start_y == end_y){
            return moves
        }
        if (Math.abs(start_x-end_x) >= Math.abs(start_y-end_y)){
            if (end_x > start_x){
                moves.push([start_x+1,start_y]);
            }else{
                moves.push([start_x-1,start_y]);
            }
        }else{
            if (end_y > start_y){
                moves.push([start_x,start_y+1]);
            }else{
                moves.push([start_x,start_y-1]);
            }
        }
        return this._generate_path(moves,end_x,end_y);
    }

    _select_character(x,y){
        this.currently_selected = this.board.get_cell(x,y);
        this.board.clear_highting();
        this._highlight_in_movement_range(x,y);
        this.board.highlight_cell(x,y,this.CHARACTER_HIGHLIGHT_COLOR);
        this._update()
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