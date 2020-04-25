function gridClicked(id){
    make_get_req("/game/move?cell_id="+id);
    update_board();
}

function update_board(){
    make_get_req('/game/update',set_board);
}

function set_board(content){
    document.getElementById('game_board').innerHTML = content;
}

function make_get_req(url,func=do_nothing){
    let xmlHttp = new XMLHttpRequest;
    xmlHttp.open("GET",url,true);
    xmlHttp.send();
    xmlHttp.onprogress = function(){
        func(xmlHttp.responseText);
    }
}

function do_nothing(foo){}