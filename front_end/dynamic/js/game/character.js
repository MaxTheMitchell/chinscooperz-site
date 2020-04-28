class Character{

    constructor(character_sheet_path,move_points=1){
        this.character_sheet_path = character_sheet_path;
        this.move_tile = 0;
        this.img_src = this._update_src_img('down',this.move_tile)
        this.move_points = move_points;
    }

    display(){
        return `<img height='100' width='100' src='${this.img_src}'>`
    }

    toString(){
        return this.display();
    }

    move_left(){
        return this._move('left');
    }

    move_right(){
        return this._move('right');
    }

    move_up(){
        return this._move('up');
    }

    move_down(){
        return this._move('down');
    }

    _move(direction){
        this._update_src_img(direction,this._update_move_tile());
    }

    _update_src_img(direction,tile){
        this.img_src = `${this.character_sheet_path}/${direction}${tile}.png`;
        return this.img_src;
    }

    _update_move_tile(){
        this.move_tile += 1;
        if (this.move_tile > 2){
            this.move_tile = 0;
        }
        return this.move_tile;
    }
}
