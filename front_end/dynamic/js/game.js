function gridClicked(id){
    var xmlHttp = new XMLHttpRequest;
    xmlHttp.open("GET","/game/move",true);
    xmlHttp.send();
    document.getElementById(id).innerHTML ="<img height='100' width='100' src='/front_end/static/imgs/game/tmp/0.png?"+ new Date().getTime()+"'>";
}