var filas=prompt("Dime el numero de filas")
var columnas=prompt("Dime el numero de columnas")

contenido="<table width=300px height=300px border=1px><tbody>";

for(i=0;i<`${columnas}`;i++){
    contenido+="<tr>";
    for(j=0;j<`${filas}`;j++){
        contenido+="<td style='text-align:center'> X </td>";
    }
    contenido+="</tr>";
}

contenido+="</table></tbody>";

document.body.innerHTML+=contenido;