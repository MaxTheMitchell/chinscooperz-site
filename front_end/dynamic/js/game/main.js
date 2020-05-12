
function setup(){
    gameController = new GameController(
        new GameBoard(30,20),
        [
            new Character("front_end/static/imgs/character_sheets/sam",3,2,2),
            new Character("front_end/static/imgs/character_sheets/niko",5,5,5)
        ]
    );
    getGameController();
    updateBoard();
}

function getGameController() {
    sendGetRequest("/game/json",(responseText) =>{
        if (responseText != "null"){
            json = JSON.parse(responseText);
            gameController = new GameController(
                new GameBoard(1,1,json.board.cellGrid),
                json.characters.map(character => {
                    return new Character(character.characterSheetPath,character.movePoints,character.x,character.y)
                })
            )
            updateBoard();
        }
    });
}

function gridClicked(x,y){
    gameController.cellClicked(x,y);
}

function updateBoard(myTurn=true){
    document.getElementById('game_board').innerHTML = gameController.display(myTurn);
}

function startTurn(){
    gameController.startTurn();
    updateBoard();
}

function endTurn(){
    gameController.endTurn();
    sendPostRequest("/game/turn/end",()=>{},JSON.stringify(gameController));
    updateBoard(false);
    waitForMyTurn();
}

function waitForMyTurn(){
    sendGetRequest("/game/turn/is_mine",function(responseText){
        if (responseText == "True"){
            startTurn();
        }else{

            setTimeout(waitForMyTurn,500);
        }
    });
}

function sendGetRequest(url,func=function(responseText){}){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            func(request.responseText);
        }
    };
    request.open("GET",url,true);
    request.send();
}

function sendPostRequest(url,func=function(responseText){},body=""){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            func(request.responseText);
        }
    };
    request.open("POST",url,true);
    request.send(body);
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
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return ""
}
