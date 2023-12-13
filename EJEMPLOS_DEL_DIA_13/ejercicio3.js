var Persona = function(nombre, apellido, dni) {
this.nombre = nombre;
this.apellido = apellido;
this.dni = dni;
this.presentar = function() {
        document.write("Hola, me llamo " + this.nombre + " " + this.apellido);
    }
};

var p1 = new Persona("Juan", "Gomez","12345678A");
var p2 = new Persona("Jose", "Garcia","12222678C");

Persona.prototype.nacionalidad = "ESPAÑOL"
Persona.prototype.cambiarDNI = function (nuevoDni) {
this.dni = nuevoDni;
};

alert(p1.nacionalidad);
alert(p2.nacionalidad);

//para borrar la propiedad en todas las instancias
delete Persona.prototype.nacionalidad;

alert(p1.nacionalidad);
alert(p2.nacionalidad);

class Vehiculo{
	constructor(modelo,color,matricula,kilometros,numAsientos,cilindrada,antiguedad,foto) {
   	  this.modelo=modelo;
	  this.color=color;
	  this.matricula=matricula;
	  this.kilometros=kilometros;
	  this.numAsientos=numAsientos;
	  this.cilindrada=cilindrada;
	  this.antiguedad=antiguedad;
	  this.foto=foto;
	}
    verAntiguedad() {
      alert("Este coche es del año " + this.antiguedad);
    }
};
 
Vehiculo.prototype.marca="SEAT";

var concesionario=[];
var vehiculo1=new Vehiculo("LEON","verde","1234KKK",0,5,2000,2017,"leon.jpg");
var vehiculo2=new Vehiculo("LEON","morado","1235KKK",0,5,2000,2017,"leon.jpg");
concesionario.push(vehiculo1);
concesionario.push(vehiculo2);

alert(vehiculo1.marca);
delete(Vehiculo.prototype.marca);
alert(vehiculo1.marca);