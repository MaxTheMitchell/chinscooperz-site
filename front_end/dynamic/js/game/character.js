class Character{

    constructor(characterSheetPath,movePoints=1){
        this.characterSheetPath = characterSheetPath;
        this.moveTile = 0;
        this.imgSrc = this._updateSrcImg('down',this.moveTile)
        this.movePoints = movePoints;
    }

    preload(){
        return `
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/left0.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/left1.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/left2.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/right0.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/right1.png'>        
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/right2.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/down0.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/down1.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/down2.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/up0.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/up1.png'>
        <img height='100' width='100' style="display:none;" src='${this.characterSheetPath}/up2.png'>
        `
    }

    display(){
        return `<img height='100' width='100' src='${this.imgSrc}'>`
    }

    toString(){
        return this.display();
    }

    changeDirection(startPoint,endPoint){
        switch((startPoint[0]-endPoint[0]) + 10*(startPoint[1]-endPoint[1])){
            case 1:
                this.moveLeft();
                break;
            case -1:
                this.moveRight();
                break;
            case 10:
                this.moveUp();
                break;
            case -10:
                this.moveDown();
        }
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
