document.addEventListener('DOMContentLoaded', loadTextBoxes)

function loadTextBoxes(){
    Array.from(document.getElementsByClassName("textbox")).forEach(textbox => {
      textbox.innerHTML = `<img src="/front_end/static/imgs/faces/${textbox.getAttribute("class").split(' ')[1]}.jpg">${textbox.innerHTML}`
    })
}