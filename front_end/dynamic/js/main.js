document.addEventListener('DOMContentLoaded', makeStuff)

function makeStuff(){
  loadTextBoxes()
  createPageControls()
  bindChoices()
}

function loadTextBoxes(){
  Array.from(document.getElementsByClassName("textbox"))
    .filter((e)=>{
      return e.getElementsByTagName("img").length < 1
    }).forEach((textbox)=>loadTextBox(textbox))
}

function loadTextBox(textbox){
  textbox.innerHTML = `<img class="face" src="/front_end/static/imgs/faces/${textbox.getAttribute("class").split(' ')[1]}.jpg">${textbox.innerHTML}`
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
  let get_previous = (e)=>{
    if(e.getAttribute('previous')){
      return e.getAttribute('previous')
    }else{return part_url+String(pageNumb-1)};
  }
  let get_next = (e)=>{
    if(e.getAttribute('next')){
      return e.getAttribute('next')
    }else{return part_url+String(pageNumb+1)};
  } 
  Array.from(document.getElementsByTagName("page_controls")).forEach((e)=>{
    e.innerHTML = `
    <a href="${get_previous(e)}
        "><button class="previous_button">Previous</button></a>
    <a href="/story/contents"><button class="table_contents_button">Table of Contents</button></a>
    <a href="${get_next(e)}"><button class="next_button">Next</button></a>
    `
  })
}

function bindChoices(){
  Array.from(document.getElementsByClassName("choices")).forEach((e)=>
    Array.from(e.getElementsByTagName("div")).forEach((div)=>div.setAttribute("onclick","makeChoice(this)"))
  )
}

function setPageTitle(titleName){
  document.getElementById("pageTitle").innerHTML = titleName.toUpperCase()
}

function makeChoice(element){
  path =  element.getAttribute("path")
  element.parentNode.innerHTML = element.innerHTML
  document.getElementsByClassName("center")[0].innerHTML 
    += paths[path].response
  paths = paths[path]
  makeStuff()
}

const CHARACTER_WIDTH_PERCENT = 5
const BEAM_SPACING = 10
function createCharacterImg(src){
  let img = document.createElement("img")
  img.setAttribute("src",src)
  img.style.position = "absolute"
  img.style.width = `${CHARACTER_WIDTH_PERCENT}%`
  img.style.bottom = "0%"
  return img
}

function duesBattleSetup(id,spacing){
  let canvas = document.getElementById(id)
  let justice = createCharacterImg("/front_end/static/imgs/character_sheets/justice/right1.png")
  let dues = createCharacterImg("/front_end/static/imgs/character_sheets/ryan/left1.png")
  justice.style.left = `${spacing}%`
  dues.style.left = `${95-spacing}%`
  canvas.appendChild(justice)
  canvas.appendChild(dues)
  return canvas
}

function fightWithBeams(id,static_center){
  let beam = makeBeam()
  beam.style.left = `${BEAM_SPACING+3}%`
  beam.style.width = `${100-BEAM_SPACING*2-8}%`
  canvas = duesBattleSetup(id,BEAM_SPACING)
  canvas.appendChild(beam)
  let i = 0
  setInterval(()=>{
      center = static_center-(i%20)+Math.floor((i%20)/10)*(i%20)*2
      beam.style.background = `
          linear-gradient(to right, red ${center-10}%,
                blue ${center+10}%)`
      i++
  },20)
}

function makeBeam(){
  let beam = document.createElement("div")
  beam.setAttribute("class","beam")
  return beam
}