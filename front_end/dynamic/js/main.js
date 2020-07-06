document.addEventListener('DOMContentLoaded', loadTextBoxes)
document.addEventListener('DOMContentLoaded', createPageControls)

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

function toggelDisplay(id){
  let element = document.getElementById(id)
  if(element.style.display === "none"){
    element.style.display ="block"
  }else{
    element.style.display = "none"
  }
}

function createPageControls(){
  let pageNumb = Number(window.location.href.match(/^.*\/([0-9]+).*$/)[1])
  let part_url = window.location.href.match(/(.*\/)[0-9]+.*$/)[1]
  Array.from(document.getElementsByTagName("page_controls")).forEach((e)=>{
    e.innerHTML = `
    <a href="${part_url}${pageNumb-1}"><button class="previous_button">Previous</button></a>
    <a href="/story/contents"><button class="table_contents_button">Table of Contents</button></a>
    <a href="${part_url}${pageNumb+1}"><button class="next_button">Next</button></a>
    `
  })
}