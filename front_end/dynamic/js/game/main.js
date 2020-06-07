const PULL_INTERVAL = 500

function setup(){
    getGameControllerFromServer(gc=>{
        gameController = gc
        gameController.addCharacters()
        gameController.display()
        gameController.preload()
        checkTurn(startTurn,endTurn)
    })
}

function getGameControllerFromServer(callback) {
    sendGetRequest("/game/json",(responseText)=>{callback(genGameFromJSON(JSON.parse(responseText)))})
}

function genGameFromJSON(json){
    json.board = new GameBoard(json.board.cellGrid)
    json.player = new Player(json.player.characters.map(character => {return constructCharacterFromJson(character)}))
    json.opponent = new Player((json.opponent.characters.map(character => {return constructCharacterFromJson(character)})))
    json.currentlySelected = parseJsonCurrentlySelected(json.currentlySelected)
    json.__proto__ = new GameController()
    return json 
}

function parseJsonCurrentlySelected(currentlySelected){
    if (currentlySelected  === ""){
        return ""
    }return constructCharacterFromJson(currentlySelected)
}

function constructCharacterFromJson(json){
    json.__proto__ = new Character()
    return json
}

function gridClicked(x,y){
    gameController.cellClicked(x,y)
}

function updateBoard(){
    gameController.display()
}

function startTurn(){
    sendPostRequest("/game/turn/start",()=>{
        gameController.startTurn()
        updateBoard()
    })
}

function endTurnButtonPressed(){
    if (gameController.canClick){
        endTurn()
    }
}

function endTurn(){
    endTurnPost(()=>{
        gameController.endTurn()
        updateBoard()
        waitForOpponentToStart(waitForMyTurn)
    })
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
