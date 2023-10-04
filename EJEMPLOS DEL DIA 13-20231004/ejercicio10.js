// ejercicio 10: Vamos a modelizar una escuela de Superheroes utilizando objetos, para ello
//    vamos a crear un objeto Superheroe.
//    Nuestro objeto tendrá las siguientes propiedades:
//      Identidad secreta, color del traje, superpoderes (que se guardarán en un array),
//      cantidad de peso que es capaz de levantar el superheroe y velocidad de vuelo
//    Sabemos que la mayoría de nuestros superheroes son capaces de volar.
//    Definiremos para ellos unos métodos:
//      Método volar que nos muestre la siguiente información:
//          "Soy capaz de volar a [velocidad de vuelo] km/h".
//        Para aquellos superheroes que no sepan volar se mostrará 0 en la velocidad de vuelo.
//      Método que nos muestre toda la información (propiedades) de un superheroe
//          utilizando la función alert.
//      Método que establezca la cantidad de peso que es capaz de levantar el
//          superheroe pidiéndoselo al usuario para que lo introduzca en un prompt.
//          Deberá decírsele al usuario la identidad secreta del superheroe para el que debe
//          introducirse el peso a levantar
//    Crearemos 4 superheroes (los que vosotros queráis) y comprobaremos que los métodos
//    y propiedades recién creados funcionan correctamente.
//    Uno de los superheroes no volará.



class SuperHeroe {
constructor(identidad,color,peso,velocidad, superpoderes){
	this.identidadSecreta=identidad || "SECRETA";
	this.colorTraje=color || "sin color";
	this.cantidadPeso=peso || 0;
	this.velocidadVuelo=velocidad || 0;
    this.superPoderes=superpoderes || [];
}
volar(){
        console.log("Soy capaz de volar a " + this.velocidadVuelo + " km/h");
    };
}

SuperHeroe.prototype.imprimeDatos= function(){
    var i, cadena;
	cadena=this.identidadSecreta + " " + this.colorTraje + " " + this.cantidadPeso+ "  " +
this.velocidadVuelo;
	for(i=0;i<this.superPoderes.length;i++){
        cadena+=" " + this.superPoderes[i];
    }
    alert(cadena);
}
 
SuperHeroe.prototype.setCantidadPeso=function(){       
	this.cantidadPeso=parseInt(prompt("Que peso es capaz de levantar"+ this.identidadSecreta + "?"));
}


var superMan = new SuperHeroe("Clark Kent", "Azul y Rojo", 35,50,["volar","ver a través", "gran fuerza"]);
superMan.imprimeDatos();
superMan.setCantidadPeso();


var lobezno = new SuperHeroe("Logan", "Negro", 35,0,["garras de adamiento","regeneración", "gran fuerza"]);
lobezno.imprimeDatos();
lobezno.volar();

