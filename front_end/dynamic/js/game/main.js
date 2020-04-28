function gridClicked(id){
    update_board();
}

function setup(){
    board = new GameBoard();
    board.add(new Character("front_end/static/imgs/character_sheets/sam"),2,2)   
    update_board();
}

function update_board(){
    document.getElementById('game_board').innerHTML = board.display();
}

