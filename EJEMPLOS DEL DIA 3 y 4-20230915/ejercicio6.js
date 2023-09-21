var capa=document.createElement("div");
capa.id="rojo"
capa.style.backgroundColor="red";
capa.style.width="200px";
capa.style.height="200px";
document.body.appendChild(capa);
var capa=document.createElement("div");
capa.id="azul";
capa.style.backgroundColor="blue";
capa.style.width="200px";
capa.style.height="200px";
document.body.appendChild(capa);
var capa=document.createElement("div");
capa.id="verde"
capa.style.backgroundColor="green";
capa.style.width="200px";
capa.style.height="200px";
document.body.appendChild(capa);
var capa=document.createElement("div");
capa.id="naranja"
capa.style.backgroundColor="orange";
capa.style.width="200px";
capa.style.height="200px";
document.body.appendChild(capa);
var capa=document.createElement("div");
capa.id="amarillo"
capa.style.backgroundColor="yellow";
capa.style.width="200px";
capa.style.height="200px";
document.body.appendChild(capa);

var color=prompt("Dime el color a ocultar");
document.getElementById(color).style.visibility ="hidden";
