function gridClicked(id){
    update_board();
}

function setup(){
    board = new GameBoard();   
    update_board();
}

function update_board(){
    document.getElementById('game_board').innerHTML = board.display();
}

