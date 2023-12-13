// ejercicio 9:  vamos a modelizar una tienda de coches usados utilizando objetos,
//  para ello vamos a crear un objeto vehiculo. Nuestro objeto tendrá las siguientes
//  propiedades:
//        marca  -  modelo - color - matricula - kilometros - numero de asientos -
//        cilindrada - antiguedad - foto
//    Definiremos para ellos unos métodos :
//      verAntiguedad: mostrará el mensaje: "Este coche es del año [antiguedad]   
//      verDiseño: mostrará una tabla con toda la información del coche incluida la foto
//      fijarColor: establecerá el color del coche pidiendoselo al usuario
//      fijarFoto: establecerá el nombre del archivo de imagen del coche
//    Establece 5 coches con sus características (los que vosotros queráis) y comprobaremos
//    que los métodos y propiedades recién creados funcionan correctamente.


var Vehiculo = function(marca, modelo, color, matricula, kilometros, numAsientos, cilindrada, antiguedad, foto) {
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.matricula = matricula;
    this.kilometros = kilometros;
    this.numAsientos = numAsientos;
    this.cilindrada = cilindrada;
    this.antiguedad = antiguedad;
    this.foto = foto;
    this.verAntiguedad = function() {
        alert("Este coche es del año " + this.antiguedad);
    }
};

Vehiculo.prototype = {
    verDiseno: function() {
        var tabla = document.createElement("table");
        document.body.appendChild(tabla);
        for (var i in this) {
            if (typeof this[i] != "function") {
                var fila = document.createElement("tr");
                tabla.appendChild(fila);
                var celda = document.createElement("td");
                fila.appendChild(celda);
                if (i == "foto") {
                    var imagen = document.createElement("img");
                    imagen.src = this[i];
                    celda.appendChild(imagen);
                } else {
                    celda.appendChild(document.createTextNode(this[i]));
                }
            }
        }
    },
    fijarColor: function() {
        this.color = prompt("Introduce el color");
    },
    fijarFoto: function(foto) {
        this.foto = foto;
    }
}

var coche1 = new Vehiculo("SEAT", "IBIZA", "BLANCO", "6666 HZH", 1000, 5, 2.0, 2014, "http://www.pagina.com/foto1.bmp");
var coche2 = new Vehiculo("SEAT", "LEON", "BLANCO", "6666 HZH", 1000, 5, 2.0, 2014, "http://www.pagina.com/foto1.bmp");
coche1.fijarColor();
coche1.fijarFoto("foto2.bmp");
coche1.verDiseno();
coche2.verDiseno();


//opcion 2: con variable arguments
var Vehiculo = function() {
    this.marca = arguments[0] || "SIN MARCA";
    this.modelo = arguments[1] || "SIN MODELO";
    this.color = arguments[2] || "BLANCO";
    this.matricula = arguments[3] || "SIN MATRICULA";
    this.kilometros = arguments[4] || 0;
    this.numAsientos = arguments[5] || 5;
    this.cilindrada = arguments[6] || 1500;
    this.antiguedad = arguments[7] || 2015;
    this.foto = arguments[8] || "sinfoto.bmp";
    this.verAntiguedad = function() {
        alert("Este coche es del año " + this.antiguedad);
    }
    this.verDiseno = function() {
        var tabla = document.createElement("table");
        document.body.appendChild(tabla);
        document.body.appendChild(document.createElement("br"));

        for (var propiedad in this) {
            if (typeof this[propiedad] != "function") {

                var fila = document.createElement("tr");
                tabla.appendChild(fila);

                var celda = document.createElement("th");
                fila.appendChild(celda);
                celda.innerHTML = propiedad;

                var celda = document.createElement("td");
                fila.appendChild(celda);

                if (propiedad == "foto") {
                    var imagen = document.createElement("img");
                    celda.appendChild(imagen);
                    imagen.src = this[propiedad];
                } else celda.innerHTML = this[propiedad];
            }
        }
    };
    this.fijarColor = function() {
        this.color = prompt("Introduce el color");
    };
    this.fijarFoto = function(foto) {
        this.foto = foto;
    }
}

var coche1 = new Vehiculo("SEAT", "IBIZA", "BLANCO", "6666 HZH", 1000, 5, 2.0, 2014, "http://www.pagina.com/foto1.bmp");
var coche2 = new Vehiculo("SEAT", "LEON");
coche1.fijarColor();
coche1.fijarFoto("foto2.bmp");
coche1.verDiseno();
coche2.verDiseno();

window.onload = function() {
    for (i = 0; i < tiendaCoches.length; i++) {
        tiendaCoches[i].verDiseno();
    }
}


class Vehiculo {
    constructor(marca, modelo, color, matricula, kilometros, numAsientos, cilindrada, antiguedad, foto) {
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.matricula = matricula;
        this.kilometros = kilometros;
        this.numAsientos = numAsientos;
        this.cilindrada = cilindrada;
        this.antiguedad = antiguedad;
        this.foto = foto;
    }
    verAntiguedad() {
        alert("Este coche es del año " + this.antiguedad);
    }
    verDiseno() {
        var tabla = document.createElement("table");
        document.body.appendChild(tabla);
        document.body.appendChild(document.createElement("br"));

        for (var propiedad in this) {
            if (typeof this[propiedad] != "function") {

                var fila = document.createElement("tr");
                tabla.appendChild(fila);

                var celda = document.createElement("th");
                fila.appendChild(celda);
                celda.innerHTML = propiedad;

                var celda = document.createElement("td");
                fila.appendChild(celda);

                if (propiedad == "foto") {
                    var imagen = document.createElement("img");
                    celda.appendChild(imagen);
                    imagen.src = this[propiedad];
                } else celda.innerHTML = this[propiedad];
            }
        }
    }
    fijarColor() {
        this.color = prompt("Introduce el color");
    }
    fijarFoto(foto) {
        this.foto = foto;
    }
}

var tiendaCoches = [];
var coche = new Vehiculo("SEAT", "IBIZA", "BLANCO", "6666 HZH", 1000, 5, 2.0, 2014, "foto1.bmp");
tiendaCoches.push(coche);
coche = new Vehiculo("SEAT", "LEON", "BLANCO", "6667 HZH", 1000, 5, 2.0, 2014, "foto2.jpeg");
tiendaCoches.push(coche);

tiendaCoches.push(new Vehiculo("SEAT", "ARONA", "BLANCO", "6668 HZH", 1000, 5, 2.0, 2016, "foto3.jpeg"));

coche = new Vehiculo("SEAT", "TOLEDO", "BLANCO", "6669 HZH", 1000, 5, 2.0, 2014, "foto4.jpeg");
tiendaCoches.push(coche);

coche = new Vehiculo("SEAT", "TOLEDO", "NEGRO", "6670 HZH", 1000, 5, 2.0, 2014, "foto5.jpeg");
tiendaCoches.push(coche);


tiendaCoches[0].fijarColor();
tiendaCoches[0].fijarFoto("foto1.jpeg");

var coche = {
    marca: "SEAT",
    modelo: "ARONA",
    color: "BLANCO",
    matricula: "asdasdfdfa",
    kilometros: 10000,
    numAsientos: 5,
    cilindrada: 2000,
    antiguedad: 2016,
    foto: "foto1.jpeg",
    verAntiguedad: function() {
        alert("Este coche es del año " + this.antiguedad);
    }
}

var coche2 = {
    marca: "SEAT",
    modelo: "ARONA",
    color: "AZUL",
    matricula: "asdasdfdfa",
    kilometros: 10000,
    numAsientos: 5,
    cilindrada: 2000,
    antiguedad: 2016,
    foto: "foto1.jpeg",
    verAntiguedad: function() {
        alert("Este coche es del año " + this.antiguedad);
    }
}

var coche3 = Object.create(coche2);


var concesionario = [];
concesionario.push(coche);
concesionario.push(coche2);

concesionario[0].verAntiguedad();