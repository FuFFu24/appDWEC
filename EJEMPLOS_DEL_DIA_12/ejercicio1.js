document.addEventListener('DOMContentLoaded', function() {
// archivo ejemplo.js
function miPrimeraFuncion() {
    console.log("Hola mundo");

    var a = 11;
    var textoEnInglesDeNumero = a == 5 ? 'Five' :
        a == 7 ? 'Seven' :
        a == 11 ? 'Eleven' :
        a == 15 ? 'Fifteen' :
        'Other Number';

    console.log(textoEnInglesDeNumero); // Eleven
}
miPrimeraFuncion();

function primerBoton() {
    //alert(33+28);
    alert("La suma de 33 + 28 es 61");
}

function segundoBoton(x,y) {
    //alert(x+y);
    alert(`La suma de ${x} + ${y} es ${x+y}`);
}

function tercerBoton(x=0,y=0) {
    return(x+y);
}

var listaChuches = ["caramelos","piruletas","chocolatinas"];

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

var listaChuches2 = [];
chuche1 = {
    "nombre":"caramelo",
    "sabor":"fresa",
    "calorias":150
}
listaChuches2.push(chuche1);

class Chuche{
    constructor(nombre,calorias=0){
        this.nombre=nombre;
        this.calorias=calorias;
    }
}

var chuches2 = new Chuche("piruletas",100);
listaChuches2.push(chuches2);
chuches2 = new Chuche("chocolatinas",200);
listaChuches2.push(chuches2);
listaChuches2.push(new Chuche("chicle",50));
console.log(listaChuches2);
console.log(JSON.stringify(listaChuches2));

listaChuches2[1].sabor = "limong";
console.log(listaChuches2);

Chuche.prototype.fabricante = "HARIBO";
console.log(listaChuches2);

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

function mostrarListaChuchesEnTabla() {
    var contenido = "<table>";
    listaChuches.forEach(element => {
        contenido += `<tr><td>${element}</td></tr>`;
    });
    contenido += "</table>";
    //document.body.innerHTML += contenido;
    document.getElementById("tablaChuches").innerHTML += contenido;
}

mostrarListaChuchesEnTabla();

function EliminarChuches(letraInicical) {
    listaChuches.forEach((element,posicion) => {
        if (element.charAt(0) == letraInicical) {
            listaChuches.splice(posicion,1);
        }
    });
mostrarListaChuchesEnTabla();
}

EliminarChuches("p");

function anadirChuches(lista,nueva) {
    //lista.push(nueva);
    lista = lista.concat(nueva);
    mostrarListaChuchesEnTabla();
}

anadirChuches(listaChuches,"chicle");

function contarLetrasChuches(lista) {
    var resultado = 0;
    lista.forEach(element => {
        resultado += element.length;
    });
    alert(resultado);
}

contarLetrasChuches(listaChuches);
});