// ejercicio 8: añadir al objeto Array un método llamado shuffle que ordene 
//    aleatoriamente los elementos del array.

Array.prototype.shuffle = function(){
var aleatorio;
var temporal = this.splice(0,this.length);

while(temporal.length>0){
aleatorio = Math.floor(Math.random()*temporal.length);
this.push(temporal.splice(aleatorio,1)[0]);
}
}
var miMatriz = new Array('rojo','verde','azul');
miMatriz.shuffle();
alert(miMatriz);
