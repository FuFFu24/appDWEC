function cargarTabla(){
   var numero=prompt("Dime un numero del 1 al 10");
   if (numero >0 && numero <11) {
     texto="<table bgcolor='blue' border=1 width=200>";

     var posicion;
     for (posicion=1;posicion<11;posicion++) {
        texto+="<tr>";
        texto+="<td>" + numero + "</td>";
        texto+="<td> x </td>";
        texto+="<td>" + posicion + "</td>";
        texto+="<td> = </td>";
        texto+="<td>" + (numero*posicion) + "</td>";
        texto+="</tr>";
     }
     texto+="</table>";
   } else {
     texto="Numero invalido";
   }
   document.body.innerHTML=texto;
 
   // se podría utilizar document.write(texto) PERO RECUERDA QUE ESTO 
   // ELIMINARÁ TODO EL CODIGO EXISTENTE
}
