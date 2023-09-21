var color;

do {
	color=prompt("Dime el color a ocultar");
} while (color!="azul" && color!="rojo" && color!="verde" && color!="naranja" && color!="amarillo")

document.getElementById(color).style.visibility ="hidden";
