// objeto creado como JSON
var persona = {
nombre: "Juan",
apellido: "Gomez",
dni: "12345678A",
coche: {
        marca: "Seat",
        modelo: "Ibiza"
    },
presentar: function() {
        document.write("Me llamo " + this["nombre"] + " y tengo un " + this.coche.marca + " " + this.coche.modelo );
    }
};
persona.nacionalidad = "ESPAÑOL";
persona.cambiarDNI = function (nuevoDni) {
this.dni = nuevoDni;
};
alert(persona.nacionalidad);

// para borrar se utiliza delete
delete persona["coche"];


// objeto creado con constructor es igual
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

p1.nacionalidad = "ESPAÑOL"
p1.cambiarDNI = function (nuevoDni) {
this.dni = nuevoDni;
};

alert(p1.nacionalidad);
alert(p2.nacionalidad); // dara un error


// Otra alternativa más moderna es utilizar el método
//  Object.defineProperty(referenciaDelObjeto, nombreDeLa Propiedad, descriptorDeLaPropiedad)
//  en este caso sólo se modificaría la instancia del objeto

var Persona = function(nombre, apellido, dni) {
this.nombre = nombre;
this.apellido = apellido;
this.dni = dni;
this.presentar = function() {
            document.write("Hola, me llamo " + this.nombre + " " + this.apellido);
        }
};

var p = new Persona("Juan", "Gomez","12345678A");

Object.defineProperty(p,"nacionalidad",{value:"ESPAÑOL"});
Object.defineProperty(p,"nombre completo",{get:function() {
    return this.nombre + " " + this.apellido;}});

p.presentar();
alert(p["nombre completo"]);
