function setup(){
    getName();
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
    sendGetRequest("/game/turn/end?name="+getName("name"));
    updateBoard();
    waitForMyTurn();
}

function waitForMyTurn(){
    sendGetRequest("/game/turn?name="+getName('name'),function(responseText){
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

function getName(){
    name = getCookie('name');
    if (name == ""){
        location.replace("/game/login");
    }else{
        return name
    }
}


function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return ""
}
