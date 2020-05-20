const PULL_INTERVAL = 500;

function setup(){
    gameController = getDefaultGame();
    getGameControllerFromServer();
    updateBoard();
    checkTurn(startTurn,endTurn);
}

function getGameControllerFromServer() {
    sendGetRequest("/game/json",(responseText) =>{
        if (responseText != "{}"){
            gameController = genGameFromJSON(JSON.parse(responseText));
            updateBoard();
        }
    });
}

function getDefaultGame(){
    return new GameController(
        new GameBoard(30,20),
        [
            new Character("front_end/static/imgs/character_sheets/sam",3,2,2),
            new Character("front_end/static/imgs/character_sheets/niko",5,5,5)
        ]
    );
}

function genGameFromJSON(json){
    return new GameController(
        new GameBoard(1,1,json.board.cellGrid),
        json.characters.map(character => {
            return new Character(
                character.characterSheetPath,character.movePoints,
                character.x,character.y,
                character.img,character.movePoints)
        })
    )
}

function gridClicked(x,y){
    gameController.cellClicked(x,y);
}

function updateBoard(){
    document.getElementById('game_board').innerHTML = gameController.display();
}

function startTurn(){
    sendPostRequest("/game/turn/start",()=>{
        gameController.startTurn();
        updateBoard();
    });
}

function endTurn(){
    endTurnPost();
    gameController.endTurn();
    updateBoard();
    waitForOpponentToStart(waitForMyTurn);
}

function makeOpponentsMoves(moves,callback=()=>{}){
    gameController.makeAutomatedMoves(moves,callback)
}


function endTurnPost(){
    sendPostRequest("/game/turn/end",()=>{},
        JSON.stringify({
            gameController : gameController,
            movesMade : gameController.movesMade.concat("end")
        }));
}

function checkTurn(trueCallback,falseCallback){
    sendGetRequest("/game/turn/isMine",(responseText)=>{
        if (responseText === "True"){
            trueCallback();
        }else{
            falseCallback();
        }
    })

}

function waitForOpponentToStart(callback){
    sendGetRequest("/game/turn/opponentHasStarted",responseText=>{
        if (responseText === "True"){
            callback();
        }else{
            setTimeout(()=>{waitForOpponentToStart(callback)},PULL_INTERVAL);
        }
    })
}

function waitForMyTurn(NumbMovesMade=0){
    sendGetRequest("/game/turn/movesMade",responseText=>{
        console.log(responseText)
        console.log(NumbMovesMade)
        let moves = JSON.parse(responseText);
        makeOpponentsMoves(moves.slice(NumbMovesMade),startTurn);
        NumbMovesMade = moves.length;
        if (moves.pop() !== "end"){
            setTimeout(()=>{waitForMyTurn(NumbMovesMade)},PULL_INTERVAL);
        }
    });
}


function sendGetRequest(url,func=()=>{}){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            func(request.responseText);
        }
    };
    request.open("GET",url,true);
    request.send();
}

function sendPostRequest(url,func=()=>{},body="{}"){
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
