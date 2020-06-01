class GameBoard {

    constructor(cellGrid=[]){
        this.cellGrid = cellGrid.map(row=>{
            return row.map(cell=>{
                cell.__proto__ = new Cell
                return cell
            })
        })
    }

    display() {
        let html = ""
        this._getAllCells().forEach(cell =>{
            html += cell.display()
        })
        return html
    }

    getCellsInRangeOf(x,y,cell_range){
        return this._getAllCells().filter(cell =>{
            return this.cellIsInRangeOfOtherCell(this.getCell(x,y),cell,cell_range)
        })
    }

    clearHighting(){
        this._getAllCells().forEach(cell =>{
            cell.clearHighting()
        })
    }
    
    highlightCell(x,y,color){
        this._accessCell(x,y).highlight(color)
    }

    getCellValue(x,y){
        return this._accessCell(x,y).get()
    }

    move(old_x,old_y,new_x,new_y){
        this.add(this.pop(old_x,old_y),new_x,new_y)
    }

    add(content,x,y){
        this._accessCell(x,y).fill(content)
    }

    pop(x,y){
        return this._accessCell(x,y).pop()
    }

    getCell(x,y){
        return this._accessCell(x,y)
    }

    cellIsInRangeOfOtherCell(cell,other_cell,cell_range){
        return (Math.abs(cell.x - other_cell.x) + Math.abs(cell.y - other_cell.y)) <= cell_range
    }

    _accessCell(x,y){
        return this.cellGrid[x][y]
    }

    _getAllCells(){
        return [].concat.apply([], this.cellGrid)
    }

}

class Cell{

    display(){
        return `<div class="game_cell"onclick='gridClicked(${this.x},${this.y});' 
            style='background-color:${this.highlightColor};width:${this.widthPercent}%;height:${this.heightPercent}%;
            left:${this._getLeftPercent()}%;top:${this._getTopPercent()}%;'>${this.content}</div>`
    }

    clearHighting(){
        this.highlightColor = ''
    }

    highlight(color){
        this.highlightColor = color
    }

    fill(content){
        this.content = content
    }

    pop(){
        let old_content = this.content
        this.content = ''
        return old_content
    }

    get(){
        return this.content
    }

    position(){
        return [this.x,this.y]
    }

    _getLeftPercent(){
        return this.x*this.widthPercent
    }

    _getTopPercent(){
        return this.y*this.heightPercent
    }
}
