function setup(){
    gameController = new GameController(
        board = new GameBoard(30,20),
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

function startTurn(){
    gameController.startTurn()
    update_board()
}

function endTurn(){
    gameController.endTurn()
    update_board()
    waitForMyTurn()
}

function waitForMyTurn(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "myTurn"){
                startTurn();
            }else{
                setTimeout(waitForMyTurn,3000)
            }
        }
      };
      request.open("GET", "/game/turn", true);
      request.send();
}
