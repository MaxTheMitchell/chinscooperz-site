class GameBoard {

    constructor(width=10,height=10) {
        this.cell_grid = [];
        for(var x=0;x<width;x++){
            this.cell_grid.push([]);
            for(var y=0;y<height;y++){
                this.cell_grid[x].push(new Cell(x,y));
            }
        }
    }

    display() {
        var html = "<table>";
        this.cell_grid.forEach( colum => {
            html += "<tr>\n";
            colum.forEach(cell => {
                html += cell.display();
                html += "</tr>";
            });
        });
        return html + "</table>";
    }

    get_cells_in_range_of(x,y,cell_range){
        return this.cell_grid.filter(function(cell){
            return this.cell_is_in_range_of_other_cell(this.get_cell(x,y),cell,cell_range);
        });
    }

    clear_highting(){
        this._get_all_cells().array.forEach(this.clear_highting());
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

    constructor(x,y,content='',highlight_color=''){
        this.content = content;
        this.x = x;
        this.y = y;
        this.highlight_color = highlight_color;
    }

    display(){
        return `<td id = '${this._get_id_str()}'; onclick='gridClicked(this.id);' style='background-color:${this.highlight_color};'>${this.content}</td>`;
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
        old_content = this.content;
        this.content = '';
        return old_content;
    }

    get(){
        return this.content;
    }

    _get_id_str(){
        return `x=${this.x}&y=${this.y}`
    }
}
