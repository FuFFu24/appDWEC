// OPCION 1: 
function Padre(attPadre) {
  this.atributoPadre=attPadre;
  this.mostrarAtributo=function(){
      alert(this.atributoPadre);
  }
}

function Hijo(attHijo, attPadre) {

  // Padre.call(this,attPadre);
  this.constructorBase=Padre;
  this.constructorBase(attPadre); 

  this.atributoHijo=attHijo;
  this.mostrarAtributo=function(){
      alert(this.atributoHijo);
  }
}
Hijo.prototype = new Padre;

a = new Hijo(2,3);
alert (a.atributoPadre);
alert (a.atributoHijo);
a.mostrarAtributo();


// OPCION 2: en los navegadores más actuales

class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(this.nombre + ' hace un ruido.');
  }
}

class Perro extends Animal {
  hablar() {
    super.hablar();
    console.log(this.nombre) + ' ladra.';
  }
}

var p = new Perro('Mitzie');
p.hablar();
