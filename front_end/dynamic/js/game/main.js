function setup(){
    gameController = new GameController(
        board = new GameBoard(),
        [
            new Character("front_end/static/imgs/character_sheets/sam"),
            new Character("front_end/static/imgs/character_sheets/niko")
        ]   
    )
    update_board()
}

function gridClicked(x,y){
    gameController.cell_clicked(x,y);
    update_board();
}

function update_board(){
    document.getElementById('game_board').innerHTML = gameController.display();
}

