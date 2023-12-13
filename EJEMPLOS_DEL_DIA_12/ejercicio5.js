var numero = prompt("Introduce un número entero");

var resultado = parImpar(numero);
alert("El número " + numero + " es " + resultado);

function parImpar(numero) {
    if (isNaN(numero)) return "No es un numero";
    else {
        if (numero % 2 == 0) {
            return "par";
        } else {
            return "impar";
        }
    }
}

// PARAMETROS POR DEFECTO

var numero = prompt("Introduce un número entero");

var resultado = parImpar(numero);
alert("El número " + numero + " es " + resultado);

function parImpar(numero = 9) {
    if (isNaN(numero)) return "No es un numero";
    else {
        if (numero % 2 == 0) {
            return "par";
        } else {
            return "impar";
        }
    }
}