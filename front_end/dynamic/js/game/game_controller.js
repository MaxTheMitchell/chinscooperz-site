class GameController {

    DESELECT_VAL = "";
    CHARACTER_HIGHLIGHT_COLOR = "red";
    MOVEMENT_COLOR = "orange";
    TMP_CHARACTER_MOV = 5;

    constructor(board = new GameBoard(), characters = [], canClick = true, currentlySelected = "", movesMade = []) {
        this.board = board;
        this.characters = characters;
        this.canClick = canClick;
        this.currentlySelected = currentlySelected;
        this.movesMade = movesMade;
        this.preload();
        this.addCharacters();
    }

    addCharacters() {
        this.characters.forEach(character => {
            this.board.add(character, character.x, character.y);
        });
    }

    display() {
        if (this.canClick) {
            return this.board.display();
        }
        return this.board.display() + "<div class='opponent_turn'><h1>Opponent's turn</h1></div>";

    }

    preload() {
        let preloads = "";
        this.characters.forEach(character => {
            preloads += character.preload();
        });
        this._update(preloads);
    }

    makeAutomatedMoves(moves, callback) {
        let interval = setInterval(() => {
            if  (moves[0] === "end"){
                clearInterval(interval);
                callback();
            }else if (moves.length < 1) {
                clearInterval(interval);
            } else {
                window["gameController"][moves[0].func].apply(this, moves[0].args);
                moves.shift();
            }
        }, 1000)
    }

    set_position(character, x, y) {
        this.board.add(character, x, y)
    }

    _update(addion = "") {
        document.getElementById('game_board').innerHTML = this.display(true) + addion;
    }

    cellClicked(x, y) {
        if (this._canClick()) {
            if (this._anythingSelected() && this._canMoveTo(x, y)) {
                this._addMoveToHistory(this._moveCharacter.name, [x, y])
                this._moveCharacter(x, y);
            } else if (this._isSelectable(x, y)) {
                this._addMoveToHistory(this._selectCharacter.name, [x, y])
                this._selectCharacter(x, y);
            }
        }
    }

    startTurn() {
        this.display();
        this._enableClick();
    }

    endTurn() {
        this.display();
        this._disableClick();
        this._clearMovesMade();
    }

    _moveCharacter(x, y) {
        this._moveAlongPath(this._generatePath([this.currentlySelected.position()], x, y));
        this.currentlySelected.setPos(x, y);
        this.board.clearHighting();
        this._deselect();
        this._update();
    }

    _moveAlongPath(path, speed = 100) {
        let interval = setInterval(moveSpace, speed)
        let self = this;
        let character = this.currentlySelected
        function moveSpace() {
            self.board.move(path[0][0], path[0][1], path[1][0], path[1][1]);
            character.changeDirection(path[0], path[1]);
            self._update();
            path.shift();
            if (path.length < 2) {
                clearInterval(interval);
            }
        }
    }

    _generatePath(moves, endX, endY) {
        let [start_x, start_y] = moves[moves.length - 1];
        if (start_x == endX && start_y == endY) {
            return moves
        }
        if (Math.abs(start_x - endX) >= Math.abs(start_y - endY)) {
            if (endX > start_x) {
                moves.push([start_x + 1, start_y]);
            } else {
                moves.push([start_x - 1, start_y]);
            }
        } else {
            if (endY > start_y) {
                moves.push([start_x, start_y + 1]);
            } else {
                moves.push([start_x, start_y - 1]);
            }
        }
        return this._generatePath(moves, endX, endY);
    }

    _selectCharacter(x, y) {
        this.currentlySelected = this.board.getCellValue(x, y);
        this.board.clearHighting();
        this._highlightInMovementRange(x, y);
        this.board.highlightCell(x, y, this.CHARACTER_HIGHLIGHT_COLOR);
        this._update()
    }

    _highlightInMovementRange(x, y) {
        this.board.getCellsInRangeOf(x, y, this.TMP_CHARACTER_MOV).forEach(cell => {
            cell.highlight(this.MOVEMENT_COLOR);
        });
    }


    _isSelectable(x, y) {
        return this.board.getCellValue(x, y) instanceof Character;
    }

    _canMoveTo(x, y) {
        return (!this._isSelectable(x, y) && this.board.cellIsInRangeOfOtherCell(
            this.currentlySelected,
            this.board.getCell(x, y),
            this.TMP_CHARACTER_MOV
        ));
    }

    _anythingSelected() {
        return this.currentlySelected != this.DESELECT_VAL;
    }

    _deselect() {
        this.currentlySelected = this.DESELECT_VAL;
    }

    _canClick() {
        return this.canClick
    }

    _enableClick() {
        this.canClick = true;
    }

    _disableClick() {
        this.canClick = false;
    }

    _clearMovesMade() {
        this.movesMade = [];
    }

    _addMoveToHistory(func, args) {
        this.movesMade.push({
            func: func,
            args: args
        })
        this.postMovesMade();
    }

    postMovesMade(){
        sendPostRequest("/game/turn/movesMade",()=>{},JSON.stringify(this.movesMade));
    }
}