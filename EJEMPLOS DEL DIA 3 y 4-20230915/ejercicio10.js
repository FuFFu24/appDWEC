var numero=0;
var suma=0;
var numeroValores=0;
while (numero!=666) {
   numero=prompt("Escribe un numero:");
   if (!isNaN(numero) && numero!=666) {
       suma=suma + parseInt(numero);
       numeroValores++;
   }
} 
var texto = document.createElement("p");
texto.appendChild(document.createTextNode("Has introducido " + numeroValores + " valores que suman " + suma));
document.body.appendChild(texto);

function crearDiv(){
    var suma=0, contador=0,dato;

    do{
        dato=prompt("dame un numero");
        
        if (isNan(dato)){
            alert("Eso no es numero");
        } else {
            contador++; //contador+=1; contador=contador+1;
            suma+=parseInt(dato); //suma=suma+dato;
        }
    } while(dato!=666);

    var parrafo=document.createElement("p");    
    parrafo.innerHTML="Suma total " + suma;
    parrafo.innerHTML+="Numero de valores " + contador;
    document.body.appendChild(parrafo);

}  