class GameBoard {

    constructor(width=10,height=10) {
        this.cell_grid = [];
        for(var x=0;x<width;x++){
            this.cell_grid.push([]);
            for(var y=0;y<height;y++){
                this.cell_grid[x].push(new Cell(x,y,100/width,100/height));
            }
        }
    }

    display() {
        var html = "";
        this._get_all_cells().forEach(cell =>{
            html += cell.display()
        });
        return html;
    }

    get_cells_in_range_of(x,y,cell_range){
        return this._get_all_cells().filter(cell =>{
            return this.cell_is_in_range_of_other_cell(this.get_cell(x,y),cell,cell_range);
        });
    }

    clear_highting(){
        this._get_all_cells().forEach(cell =>{
            cell.clear_highting();
        });
    }
    
    highlight_cell(x,y,color){
        this._access_cell(x,y).highlight(color);
    }

    get_cell_value(x,y){
        return this._access_cell(x,y).get();
    }

    move(old_x,old_y,new_x,new_y){
        this.add(this.pop(old_x,old_y),new_x,new_y);
    }

    add(content,x,y){
        this._access_cell(x,y).fill(content);
    }

    pop(x,y){
        return this._access_cell(x,y).pop();
    }

    get_cell(x,y){
        return this._access_cell(x,y);
    }

    cell_is_in_range_of_other_cell(cell,other_cell,cell_range){
        return (Math.abs(cell.x - other_cell.x) + Math.abs(cell.y - other_cell.y)) <= cell_range;
    }

    _access_cell(x,y){
        return this.cell_grid[x][y];
    }

    _get_all_cells(){
        return [].concat.apply([], this.cell_grid);
    }

}

class Cell{

    constructor(x,y,width_percent,height_percent,content='',highlight_color=''){
        this.content = content;
        this.x = x;
        this.y = y;
        this.highlight_color = highlight_color;
        this.width_percent = width_percent;
        this.height_percent = height_percent;
    }

    display(){
        return `<div class="game_cell"onclick='gridClicked(${this.x},${this.y});' 
            style='background-color:${this.highlight_color};width:${this.width_percent}%;height:${this.height_percent}%;
            left:${this._get_left_percent()}%;top:${this._get_top_percent()}%;'>${this.content}</div>`;
    }

    clear_highting(){
        this.highlight_color = '';
    }

    highlight(color){
        this.highlight_color = color;
    }

    fill(content){
        this.content = content;
    }

    pop(){
        var old_content = this.content;
        this.content = '';
        return old_content;
    }

    get(){
        return this.content;
    }

    _get_left_percent(){
        return this.x*this.width_percent;
    }

    _get_top_percent(){
        return this.y*this.height_percent;
    }
}
