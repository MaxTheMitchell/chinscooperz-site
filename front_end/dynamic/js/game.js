function gridClicked(id){
    let xmlHttp = new XMLHttpRequest;
    xmlHttp.open("GET","/game/move",true);
    xmlHttp.send();
    console.log("<img height='100' width='100' src='/front_end/static/imgs/game/tmp/0.png?"+ new Date().getTime()+"'>");
    console.log(xmlHttp.responseText);
    xmlHttp.onload = function() {
        document.getElementById(id).innerHTML = xmlHttp.responseText;
      };
}