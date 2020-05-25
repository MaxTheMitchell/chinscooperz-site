const PULL_INTERVAL = 500;

function setup(){
    gameController = getDefaultGame();
    getGameControllerFromServer();
    updateBoard();
    checkTurn(startTurn,endTurn);
}

function getGameControllerFromServer() {
    sendGetRequest("/game/json",(responseText) =>{
        // TODO: fix this ridiculousness 
        if (responseText !== '{"movesMade": []}'){
            gameController = genGameFromJSON(JSON.parse(responseText));
            updateBoard();
        }
    });
}

function getDefaultGame(){
    return new GameController(
        new GameBoard(30,20),
        new Player([
            new Character("front_end/static/imgs/character_sheets/sam","front_end/static/imgs/faces/sam.jpg",3,2,2),
            new Character("front_end/static/imgs/character_sheets/niko","front_end/static/imgs/faces/niko.jpg",5,5,5)
        ])
    );
}

function genGameFromJSON(json){
    return new GameController(
        new GameBoard(1,1,json.board.cellGrid),
        new Player(
            json.player.characters.map(character => {return constructCharacterFromJson(character)})
        ),
        json.canClick,
        parseJsonCurrentlySelected(json.currentlySelected),
        json.movesMade
    )
}

function parseJsonCurrentlySelected(currentlySelected){
    if (currentlySelected  === ""){
        return ""
    }return constructCharacterFromJson(currentlySelected)
}

function constructCharacterFromJson(json){
    return new Character(
        json.characterSheetPath,json.facePath,
        json.movePoints,
        json.x,json.y,
        json.img,json.movePoints)
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
    endTurnPost(()=>{
        gameController.endTurn();
        updateBoard();
        waitForOpponentToStart(waitForMyTurn);
    })
}

function makeOpponentsMoves(moves,callback=()=>{}){
    gameController.makeAutomatedMoves(moves,callback)
}


function endTurnPost(callback){
    gameController.movesMade.push("end")
    sendPostRequest("/game/turn/end",callback,JSON.stringify(gameController));
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
        let moves = JSON.parse(responseText);
        makeOpponentsMoves(moves.slice(NumbMovesMade),startTurn);
        NumbMovesMade = moves.length;
        if (moves.pop() !== "end"){
            setTimeout(()=>{waitForMyTurn(NumbMovesMade)},PULL_INTERVAL);
        }
    });
}


function sendGetRequest(url,callback=()=>{}){
    fetch(url)
        .then((response)=>{
            return response.text()
        }).then(callback)
}

function sendPostRequest(url,callback=()=>{},body="{}"){
    fetch(url,{
        method : "POST",
        body : body 
    }).then((response)=>{
        return response.text()
    }).then(callback)
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
    return Cookies.get(cname)
}
