var numFilas=prompt("Indica el numero de filas");
var numColumnas=prompt("Indica el numero de columnas");

var tabla=document.createElement("table");
tabla.width=300;
tabla.style.height=300;
document.body.appendChild(tabla);

for (i=0;i<numFilas;i++) {

    var fila=document.createElement("tr");
	tabla.appendChild(fila);

	for (j=0;j<numColumnas;j++) {
	    var celda=document.createElement("td");
	    fila.appendChild(celda);
		
		var contenido=document.createTextNode("A");
		celda.style.border="1px solid black";
		celda.appendChild(contenido);
		
		if ((i % 2) != (j % 2)) celda.style.backgroundColor='green';
	    
	}    
}
