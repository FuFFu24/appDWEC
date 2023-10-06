var Persona = function(nombre, apellido, dni) {

  //propiedad privada
  var equipoFutbol="BETIS";

  this.nombre = nombre;
  this.apellido = apellido;
  this.dni = dni;
  this.presentar = function() {
            document.write("Hola, me llamo " + this.nombre + " " + this.apellido);
        }

  // metodo privado
  var cantar = function() {
        alert("OLE");
  }
};

var p1 = new Persona("Juan", "Gomez","12345678A");

alert(p1.nombre);
alert(p1.equipoFutbol);
alert(p1.cantar());
