class Character{

    constructor(characterSheetPath,movePoints=1){
        this.characterSheetPath = characterSheetPath;
        this.moveTile = 0;
        this.imgSrc = this._updateSrcImg('down',this.moveTile)
        this.movePoints = movePoints;
    }

    display(){
        return `<img height='100' width='100' src='${this.imgSrc}'>`
    }

    toString(){
        return this.display();
    }

    moveLeft(){
        return this._move('left');
    }

    moveRight(){
        return this._move('right');
    }

    moveUp(){
        return this._move('up');
    }

    moveDown(){
        return this._move('down');
    }

    _move(direction){
        this._updateSrcImg(direction,this._updateMoveTile());
    }

    _updateSrcImg(direction,tile){
        this.imgSrc = `${this.characterSheetPath}/${direction}${tile}.png`;
        return this.imgSrc;
    }

    _updateMoveTile(){
        this.moveTile += 1;
        if (this.moveTile > 2){
            this.moveTile = 0;
        }
        return this.moveTile;
    }
}
