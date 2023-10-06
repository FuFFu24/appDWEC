
class Alumno {
  constructor(nombre,apellidos,matricula)
  this.nombre= nombre;
  this.apellidos= apellidos;
  this.nombreCompleto= nombre + " " + apellidos;
  this.matricula= matricula;
    this.listaModulos= ["Desarrollo web cliente","Desarrollo web servidor"];
  }
  modificarMatricula(matricula) {
    this.matricula=matricula;
  }
  mostrarDetalles() {
    for (var i in this) {
       if (typeof(this[i]) != "function") {
         alert(i + ":" + this[i]);
        }
    }
  }
};
var alumno=new Alumno("JUAN","GOMEZ DIAZ","112323W");
alumno.modificarMatricula("1234567W");
alumno.mostrarDetalles();


// como JSON
var alumno = {
  nombre: "Juan",
  apellidos: "Gomez Molero",
  'nombre completo': "Juan Gomez",
  matricula: 888,
  listaModulos: ["Desarrollo web cliente","Desarrollo web servidor"],
  modificarMatricula: function(matricula) {
    this.matricula=matricula;
  },
  mostrarDetalles: function() {
    for (var i in this) {
      if (typeof(this[i]) != "function") {
        document.write("<br>" + i + ":" + this[i]);
      }
    }
  }
};

alumno.modificarMatricula(666);
alumno.mostrarDetalles();

//Como funcion
var Alumno = function(nombre,apellidos,matricula,listaModulos){
  this.nombre= nombre;
  this.apellidos= apellidos;
  this.matricula= matricula;
  this.listaModulos=listaModulos;
  this.modificarMatricula= function(matricula) {
    this.matricula=matricula;
  };
  this.mostrarDetalles= function() {
    for (var i in this) {
      if (typeof(this[i]) != "function") {
        document.write("<br>" + i + ":" + this[i]);
      }
    }
  };
};

var alumno1 = new Alumno("Juan", "Gomez Molero",888,["SISTEMAS","BBDD"])
alumno1.modificarMatricula(666);
alumno1.mostrarDetalles();
