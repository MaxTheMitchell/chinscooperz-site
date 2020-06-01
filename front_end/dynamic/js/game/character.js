class Character{
    
    facePath(){
        return "/front_end/static/imgs/faces/"+this.name+".jpg"
    }

    characterSheetPath(){
        return "/front_end/static/imgs/character_sheets/"+this.name
    }

    setPos(x,y){
        this.x = x
        this.y = y
    }

    position(){
        return [this.x,this.y]
    }

    preload(){
        return `
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/left0.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/left1.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/left2.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/right0.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/right1.png'>        
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/right2.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/down0.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/down1.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/down2.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/up0.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/up1.png'>
        <img height='100' width='100' style="display:none" src='${this.characterSheetPath()}/up2.png'>
        `
    }

    display(){
        return `<img height='100' width='100' src='${this.imgPath()}'>`
    }

    displayPanel(){
        return `<div class="character_panel ${this.name}">
            <img src=${this.facePath()}>
            <div class="character_info">${this.displayHealth()}</div>
        </div>`
    }

    displayHealth(){
        return `<div class="health_display" style= "width:${100*this.health/this.maxHealth}%;">hp:${this.health}/${this.maxHealth}</div> `
    }

    imgPath(){
        return this.characterSheetPath()+'/'+this.img
    }

    toString(){
        return this.display()
    }

    changeDirection(startPoint,endPoint){
        switch((startPoint[0]-endPoint[0]) + 10*(startPoint[1]-endPoint[1])){
            case 1:
                this.moveLeft()
                break
            case -1:
                this.moveRight()
                break
            case 10:
                this.moveUp()
                break
            case -10:
                this.moveDown()
        }
    }

    moveLeft(){
        return this._move('left')
    }

    moveRight(){
        return this._move('right')
    }

    moveUp(){
        return this._move('up')
    }

    moveDown(){
        return this._move('down')
    }

    _move(direction){
        this._updateImg(direction,this._updateMoveTile())
    }

    _updateImg(direction,tile){
        this.img = `${direction}${tile}.png`
        return this.img
    }

    _updateMoveTile(){
        this.moveTile += 1
        if (this.moveTile > 2){
            this.moveTile = 0
        }
        return this.moveTile
    }
}
