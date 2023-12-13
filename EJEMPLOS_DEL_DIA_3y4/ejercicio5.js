var color2="";
var color=prompt("Dame un color");
switch (color) {
  case "rojo": 
        color2="red";
        break;
  case "verde": 
        color2="green";
        break;
  case "azul": 
        color2="blue";
        break;
  case "amarillo": 
        color2="yellow";
        break;
  case "naranja": 
        color2="orange";
        break;
   default:
	alert("Color invalido");
}
if (color2 !="") {
    var capa=document.createElement("div");
    capa.style.backgroundColor=color2;
    capa.style.width="200px";
    capa.style.height="200px";
    document.body.appendChild(capa);
}
