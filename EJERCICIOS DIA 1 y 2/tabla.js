contenido="<table bgcolor='33c7ff' border=1 width=200><tbody>";

for(i=0;i<3;i++){
    contenido+="<tr>";
    for(j=0;j<3;j++){
        contenido+="<td> x </td>";
    }
    contenido+="</tr>";
}

contenido+="</table></tbody>";

document.body.innerHTML+=contenido;