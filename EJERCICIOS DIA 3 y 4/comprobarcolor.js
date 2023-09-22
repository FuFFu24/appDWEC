document.body.innerHTML+=`<div style="background-color: red; width:200px; height:200px; display: inline-block;" id="rojo"></div>`

document.body.innerHTML+=`<div style="background-color: green; width:200px; height:200px; display: inline-block;" id="verde"></div>`

document.body.innerHTML+=`<div style="background-color: blue; width:200px; height:200px; display: inline-block;" id="azul"></div>`

document.body.innerHTML+=`<div style="background-color: yellow; width:200px; height:200px; display: inline-block;" id="amarillo"></div>`

document.body.innerHTML+=`<div style="background-color: orange; width:200px; height:200px; display: inline-block;" id="naranja"></div>`

var color=prompt("Color para eliminar")

while (color!="rojo" && color!="verde" && color!="azul" && color!="amarillo" && color!="naranja") {
    
    color=prompt("Color para eliminar")

}

document.getElementById(`${color}`).style.display="none";