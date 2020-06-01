document.addEventListener('DOMContentLoaded', loadTextBoxes)

function loadTextBoxes(){
    Array.from(document.getElementsByClassName("textbox")).forEach(textbox => {
      textbox.innerHTML = `<img src="/front_end/static/imgs/faces/${textbox.getAttribute("class").split(' ')[1]}.jpg">${textbox.innerHTML}`
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