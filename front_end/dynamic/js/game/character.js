class Character{

    constructor(character_sheet,move_points=1){
        this.character_sheet = character_sheet;
        this.move_tile = 0;
        this.move_down();
        this.move_points = move_points;
    }

    display(){
        return this._static_img_str();
    }

    move_left(){
        return this._move(1);
    }

    move_right(){
        return this._move(2);
    }

    move_up(){
        return this._move(3);
    }

    move_down(){
        return this._move(0);
    }

    _move(direction){
        this.move_tile += 1;
        if (this.move_tile > 2){
            this.move_tile = 0;
        }
        this.this.character_sheet.show_section()
    }

    _current_time_in_ms(this){
        return Date.now()
    }

    _dynamic_img_str(this){
        return "<img height='100' width='100' src='{}?{}'>".format(this.character_sheet.display(),this._current_time_in_ms())
    }

    _static_img_str(this){
        return "<img height='100' width='100' src='{}'>".format(this.character_sheet.display())
    }
}
