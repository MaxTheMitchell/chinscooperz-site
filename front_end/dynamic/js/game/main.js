function setup(){
    gameController = new GameController(
        board = new GameBoard(30,20),
        [
            new Character("front_end/static/imgs/character_sheets/sam"),
            new Character("front_end/static/imgs/character_sheets/niko")
        ],
        updateBoard
    )
    updateBoard()
}

function gridClicked(x,y){
    gameController.cellClicked(x,y);
}

function updateBoard(){
    document.getElementById('game_board').innerHTML = gameController.display();
}

function startTurn(){
    gameController.startTurn();
    updateBoard();
}

function endTurn(){
    gameController.endTurn();
    sendGetRequest("/game/turn/end");
    updateBoard();
    waitForMyTurn();
}

function waitForMyTurn(){
    sendGetRequest("/game/turn",function(responseText){
        if (responseText == "True"){
            startTurn();
        }else{
            setTimeout(waitForMyTurn,500);
        }
    });
}

function sendGetRequest(url,func=function(responseText){}){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            func(request.responseText);
        }
    };
    request.open("GET",url,true);
    request.send();
}
