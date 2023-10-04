// ejercicio 1: definir un objeto

//opcion 1: JSON
//    Un object literal es una lista separada por comas de conjuntos  clave:valor y encerrada entre llaves

var persona = {
nombre: "Juan",
apellido: "Gomez",
dni: "12345678A",
coche: {
        marca: "Seat",
        modelo: "Ibiza"
    },
presentar: function() {
        console.log("Me llamo " + this["nombre"] + " y tengo un " + this.coche.marca + " " + this.coche.modelo );
    }
};

alert(persona.nombre);


// opcion 2: utilizando el operador new y una función constructora (variante del método Object()). 
//    Esta función sirve para inicializar el nuevo objeto creado

function Persona(nombre, apellido, dni) {
this.nombre = nombre;
this.apellido = apellido;
this.dni = dni;
this.presentar = function() {
            console.log("Hola, me llamo " + this.nombre + " " + this.apellido);
        }
};

var persona1 = new Persona("Juan", "Gomez","12345678A");
alert(persona1.apellido);


// opcion 3: utilizando el metodo Object()

var persona = new Object();
persona.nombre= "Juan",
persona.apellido= "Gomez",
persona["dni"]= "12345678A";
persona.presentar= function() {
      console.log("Me llamo " + this["nombre"] + " y tengo el DNI " + this.dni );
};

alert(persona.dni);


// opcion 4: utilizando el método Object.create() 

var persona = {
nombre: "Juan",
apellido: "Gomez",
dni: "12345678A",
coche: {
        marca: "Seat",
        modelo: "Ibiza"
    },
presentar: function() {
        console.log("Me llamo " + this["nombre"] + " y tengo un " + this.coche.marca + " " + this.coche.modelo );
    }
};

var persona1 = Object.create(persona);
persona1.nombre="Jose";
persona2.presentar();

var persona2 = Object.create(persona);
persona2.nombre="Juan";
persona2.presentar();


// opcion 5: sólo en los navegadores más actualizados

class Persona {
  constructor(nombre, apellido, dni) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
  }
  presentar() {
            alert("Hola, me llamo " + this.nombre + " " + this.apellido);
  }
}

var persona3 = new Persona("Juan","Garcia Gomez","12345678W");
persona3.presentar();
