const PULL_INTERVAL = 500

function setup(){
    getGameControllerFromServer(gc=>{
        gameController = gc
        updateBoard()
        checkTurn(startTurn,endTurn)
    })
}

function getGameControllerFromServer(callback) {
    sendGetRequest("/game/json",(responseText)=>{callback(genGameFromJSON(JSON.parse(responseText)))})
}

function genGameFromJSON(json){
    return new GameController(
        new GameBoard(json.board.cellGrid),
        new Player(
            json.player.characters.map(character => {return constructCharacterFromJson(character)})
        ),
        new Player(
            json.opponent.characters.map(character => {return constructCharacterFromJson(character)})
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
    gameController.cellClicked(x,y)
}

function updateBoard(){
    document.getElementById('game_board').innerHTML = gameController.display()
}

function startTurn(){
    sendPostRequest("/game/turn/start",()=>{
        gameController.startTurn()
        updateBoard()
    })
}

function endTurn(){
    if (gameController.canClick){
        endTurnPost(()=>{
            gameController.endTurn()
            updateBoard()
            waitForOpponentToStart(waitForMyTurn)
        })
    }
}

function makeOpponentsMoves(moves,callback=()=>{}){
    gameController.makeAutomatedMoves(moves,callback)
}


function endTurnPost(callback){
    gameController.movesMade.push("end")
    sendPostRequest("/game/turn/end",callback,JSON.stringify(gameController))
}

function checkTurn(trueCallback,falseCallback){
    sendGetRequest("/game/turn/isMine",(responseText)=>{
        if (responseText === "True"){
            trueCallback()
        }else{
            falseCallback()
        }
    })

}

function waitForOpponentToStart(callback){
    sendGetRequest("/game/turn/opponentHasStarted",responseText=>{
        if (responseText === "True"){
            callback()
        }else{
            setTimeout(()=>{waitForOpponentToStart(callback)},PULL_INTERVAL)
        }
    })
}

function waitForMyTurn(NumbMovesMade=0){
    sendGetRequest("/game/turn/movesMade",responseText=>{
        let moves = JSON.parse(responseText)
        makeOpponentsMoves(moves.slice(NumbMovesMade),startTurn)
        NumbMovesMade = moves.length
        if (moves.pop() !== "end"){
            setTimeout(()=>{waitForMyTurn(NumbMovesMade)},PULL_INTERVAL)
        }
    })
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
    name = getCookie('name')
    if (name == ""){
        location.replace("/game/login")
    }else{
        return name
    }
}

function getCookie(cname){
    return Cookies.get(cname)
}
