var filas=prompt("Dime el numero de filas")
var columnas=prompt("Dime el numero de columnas")

contenido="<table width=300px height=300px border=1px><tbody>";

for(i=0;i<`${columnas}`;i++){
    contenido+="<tr>";
    for(j=0;j<`${filas}`;j++){
        if ((j%2)!=(i%2)) {
            if (i==j) {
                contenido+="<td style='text-align:center; background-color:green'> X </td>";
            } else {
                contenido+="<td style='text-align:center; background-color:green'></td>";
            }
        } else {
            if (i==j) {
                contenido+="<td style='text-align:center; background-color:red'> X </td>";
            } else {
                contenido+="<td style='text-align:center; background-color:red'></td>";
            }
        }
    }
    contenido+="</tr>";
}

contenido+="</table></tbody>";

document.body.innerHTML+=contenido;