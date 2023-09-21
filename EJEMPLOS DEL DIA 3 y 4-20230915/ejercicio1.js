// Ejemplo con for
function cargarTabla(){
    var texto="";
    for(i=0;i<20;i++){
            texto = texto + "<p>"+ (i*2) +"</p>";
    }
    document.getElementById("tabla").innerHTML=texto;
}

// ejemplo con while y creando una tabla
function cargarTabla(){
    var i=0;
    var cntDePares=0;
    texto="<table border=1>";
     
    while(cntDePares<21) {
        if (i%2==0) {
            cntDePares++;
            texto+="<tr>";
            texto+="<td>" + cntDePares + "</td>";
            texto+="<td>" + i + "</td>";
            texto+="</tr>";

        }
        i++;
    }
    texto+="</table>";
    document.body.innerHTML+=texto;
}
