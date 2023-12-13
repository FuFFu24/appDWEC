// ejercicio 12: Rehaz el ejercicio utilizando herencia: en principio crearemos un objeto
//  superheroe que no vuele y, a partir de él, crearemos un objeto SuperHeroeVolador que
//  herede las propiedades y métodos del anterior.


class SuperHeroe{
	constructor(identidad,color,peso,superpoderes){ 
		this.identidadSecreta=identidad;
		this.colorTraje=color;
		this.cantidadPeso=peso;
		this.superPoderes=superpoderes;
	}
    imprimeDatos(){
        var i, cadena;       
		cadena=this.identidadSecreta + " " + this.colorTraje + " " + this.cantidadPeso;
		for(i=0;i<this.superPoderes.length;i++){           
			cadena+=" " + this.superPoderes[i];
		}
		alert(cadena);
	}
    setCantidadPeso(){
        this.cantidadPeso=parseInt(prompt("Que peso es capaz de levantar"+ this.identidadSecreta + "?"));
    }
}

class SuperHeroeVolador extends SuperHeroe{
	constructor(identidad,color,peso,superpoderes,velocidad){
		super(identidad,color,peso,superpoderes)
		this.velocidadVuelo = velocidad;
	}
	volar(){
		alert("Soy capaz de volar a " + this.velocidadVuelo + " km/h");
	}
}

var lobezno = new SuperHeroe("Logan", "Negro", 85,["garras de adamiento","regeneración", "gran fuerza"]);
var superMan = new SuperHeroeVolador("Clark Kent","azul",120,["visión laser","gran fuerza"],150);

lobezno.imprimeDatos();
superMan.imprimeDatos();
superMan.volar();