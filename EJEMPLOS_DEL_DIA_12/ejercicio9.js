//   se crea una variable global
var nombre = "JOSE";

function cambiar1() {
    var nombre = "CARLOS";
    document.body.innerHTML += "</BR>EN CAMBIAR1 LA VARIABLE LOCAL nombre VALE: " + nombre;
}

function cambiar2() {
    nombre = "PEDRO";
    document.body.innerHTML += "</BR>EN CAMBIAR2 LA VARIABLE GLOBAL nombre VALE: " + nombre;
}
document.body.innerHTML += "</BR>INICIALMENTE LA VARIABLE GLOBAL VALE: " + nombre;
cambiar1();
document.body.innerHTML += "< /BR>TRAS EJECUTAR LA FUNCION CAMBIAR1 VALE: " + nombre;
cambiar2();
document.body.innerHTML = "</BR>TRAS EJECUTAR LA FUNCION CAMBIAR2 VALE: " + nombre;