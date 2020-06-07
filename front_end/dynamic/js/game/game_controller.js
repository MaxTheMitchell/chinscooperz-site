class GameController {

    DESELECT_VAL = ""
    // CHARACTER_HIGHLIGHT_COLOR = "red"
    MOVEMENT_COLOR = "rgba(170,255,170,0.5)"
    TMP_CHARACTER_MOV = 5

    addCharacters() {
        this.player.characters.concat(this.opponent.characters).forEach(character => {
            this.board.add(character, character.x, character.y)
        })
    }

    display() {
        if (this.canClick) {
            document.getElementById("game_board").innerHTML = this.board.display()
        }else{
            document.getElementById("game_board").innerHTML = this.board.display() + "<div class='opponent_turn'><h1>Opponent's turn</h1></div>"
        }
        document.getElementById("left_border").innerHTML = `
            ${this.player.display()}
            <button class="end_turn_button" onclick="endTurnButtonPressed()">
                <h3>End Turn</h3>
            </button>`
        document.getElementById("right_border").innerHTML = this.opponent.display()
    }

    preload() {
        document.body.innerHTML += this.player.preloadCharacters()
    }

    makeAutomatedMoves(moves, callback) {
        let interval = setInterval(() => {
            if  (moves[0] === "end"){
                clearInterval(interval)
                callback()
            }else if (moves.length < 1) {
                clearInterval(interval)
            } else {
                window["gameController"][moves[0].func].apply(this, moves[0].args)
                moves.shift()
            }
        }, 1000)
    }

    set_position(character, x, y) {
        this.board.add(character, x, y)
    }

    cellClicked(x, y) {
        if (this._canClick()) {
            if (this._anythingSelected() && this._canMoveTo(x, y)) {
                this._moveCharacter(x, y)
                this._addMoveToHistory(this._moveCharacter.name, [x, y])
            } else if (this._isSelectable(x, y)) {
                this._selectCharacter(x, y)
                this._addMoveToHistory(this._selectCharacter.name, [x, y])
            }
            this.postMovesMade()
        }
    }

    startTurn() {
        this.display()
        this._enableClick()
    }

    endTurn() {
        this.display()
        this._disableClick()
        this._clearMovesMade()
    }

    _moveCharacter(x, y) {
        this._moveAlongPath(this._generatePath([this.currentlySelected.position()], x, y))
        this.currentlySelected.setPos(x, y)
        this.board.clearHighting()
        this.deselect()
        this.display()
    }

    _moveAlongPath(path, speed = 100) {
        let interval = setInterval(moveSpace, speed)
        let self = this
        let character = this.currentlySelected
        function moveSpace() {
            self.board.move(path[0][0], path[0][1], path[1][0], path[1][1])
            character.changeDirection(path[0], path[1])
            self.display()
            path.shift()
            if (path.length < 2) {
                clearInterval(interval)
            }
        }
    }

    _generatePath(moves, endX, endY) {
        let [start_x, start_y] = moves[moves.length - 1]
        if (start_x == endX && start_y == endY) {
            return moves
        }
        if (Math.abs(start_x - endX) >= Math.abs(start_y - endY)) {
            if (endX > start_x) {
                moves.push([start_x + 1, start_y])
            } else {
                moves.push([start_x - 1, start_y])
            }
        } else {
            if (endY > start_y) {
                moves.push([start_x, start_y + 1])
            } else {
                moves.push([start_x, start_y - 1])
            }
        }
        return this._generatePath(moves, endX, endY)
    }

    _selectCharacter(x, y) {
        this.currentlySelected = this.board.getCellValue(x, y)
        this.board.clearHighting()
        this._highlightInMovementRange(x, y)
        this.board.highlightCell(x, y, this.CHARACTER_HIGHLIGHT_COLOR)
        this.display()
    }

    _highlightInMovementRange(x, y) {
        this.board.getCellsInRangeOf(x, y, this.TMP_CHARACTER_MOV).forEach(cell => {
            cell.highlight(this.MOVEMENT_COLOR)
        })
    }


    _isSelectable(x, y) {
        return this.player.hasCharacterAt(x,y)
    }

    _canMoveTo(x, y) {
        return (!this._isSelectable(x, y) && this.board.cellIsInRangeOfOtherCell(
            this.currentlySelected,
            this.board.getCell(x, y),
            this.TMP_CHARACTER_MOV
        ))
    }

    _anythingSelected() {
        return this.currentlySelected != this.DESELECT_VAL
    }

    deselect() {
        this.currentlySelected = this.DESELECT_VAL
    }

    _canClick() {
        return this.canClick
    }

    _enableClick() {
        this.canClick = true
    }

    _disableClick() {
        this.canClick = false
    }

    _clearMovesMade() {
        this.movesMade = []
    }

    _addMoveToHistory(func, args) {
        this.movesMade.push({
            func: func,
            args: args
        })
    }

    postMovesMade(callback=()=>{}){
        sendPostRequest("/game/turn/makeMove",callback,JSON.stringify(this))
    }
}