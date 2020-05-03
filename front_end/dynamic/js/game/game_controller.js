class GameController{

    DESELECT_VAL = "";
    CHARACTER_HIGHLIGHT_COLOR = "red";
    MOVEMENT_COLOR = "orange";
    TMP_CHARACTER_MOV = 5;

    constructor(board=board.GameBoard(),characters=[],myTurn=true,currentlySelected=""){
        this.board = board;
        this.characters = characters;
        this.board.add(characters[0],2,5);
        this.board.add(characters[1],5,5);
        this.currentlySelected = currentlySelected;
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

    cellClicked(x,y){
        if (this._anythingSelected() && this._canMoveTo(x,y)){
            this._moveCharacter(x,y);
        }else if (this._isSelectable(x,y)){
            this._selectCharacter(x,y);
        }
    }

    startTurn(){
        this.myTurn = true
    }

    endTurn(){
        this.myTurn = false
    }

    _moveCharacter(x,y){
        this._moveAlongPath(this._generatePath([this.currentlySelected.position()],x,y));
        this.board.clearHighting();
        this._deselect();
        this._update();
    }

    _moveAlongPath(path,speed=100){
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

    _generatePath(moves,end_x,end_y){
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
        return this._generatePath(moves,end_x,end_y);
    }

    _selectCharacter(x,y){
        this.currentlySelected = this.board.getCell(x,y);
        this.board.clearHighting();
        this._highlightInMovementRange(x,y);
        this.board.highlightCell(x,y,this.CHARACTER_HIGHLIGHT_COLOR);
        this._update()
    }

    _highlightInMovementRange(x,y){
       this.board.getCellsInRangeOf(x,y,this.TMP_CHARACTER_MOV).forEach(cell => {
           cell.highlight(this.MOVEMENT_COLOR);
       });
    }
            

    _isSelectable(x,y){
        return this.board.getCellValue(x,y) instanceof Character;
    }

    _canMoveTo(x,y){
        return (!this._isSelectable(x,y) && this.board.cellIsInRangeOfOtherCell(
            this.currentlySelected,
            this.board.getCell(x,y),
            this.TMP_CHARACTER_MOV
        ));
    }

    _anythingSelected(){
        return this.currentlySelected != this.DESELECT_VAL;
    }

    _deselect(){
        this.currentlySelected = this.DESELECT_VAL;
    }
}