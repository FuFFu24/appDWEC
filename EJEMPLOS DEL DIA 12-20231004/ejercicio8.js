// posibilidad 1
function palindromo(cadena) {

    var resultado = "La cadena \"" + cadena + "\" \n";

    // Pasar a minusculas la cadena
    var cadenaOriginal = cadena.toLowerCase();

    var cadenaSinEspacios = "";
    for (i = 0; i < cadenaOriginal.length; i++) {
        if (cadenaOriginal.charAt(i) != " ") cadenaSinEspacios += cadenaOriginal.charAt(i);
    }

    if (cadenaSinEspacios.length > 0) {
        var seguir = true;
        var i = 0;
        while (seguir && i < (cadenaSinEspacios.length / 2)) {
            if (cadenaSinEspacios.charAt(i) != cadenaSinEspacios.charAt(cadenaSinEspacios.length - i - 1)) {
                seguir = false;
            }
            i++;
        }
        if (seguir) {
            resultado += " es un palíndromo";
        } else {
            resultado += " no es un palíndromo";
        }

    } else {
        resultado += " esta vacía";
    }

    return resultado;
}


// posibilidad 2
function palindromo(cadena) {

    var resultado = "La cadena \"" + cadena + "\" \n";

    // Pasar a minusculas la cadena
    var cadenaOriginal = cadena.toLowerCase().replace(/\s/g, "");
    var cadenaInversa = cadenaOriginal.split("").reverse().join("");

    if (cadenaOriginal == cadenaInversa) {
        resultado += " es un palíndromo";
    } else {
        resultado += " no es un palíndromo";
    }

    return resultado;
}


// posibilidad 3
function palindromo(cadena) {

    var resultado = "La cadena \"" + cadena + "\" \n";

    // Pasar a minusculas la cadena
    var cadenaOriginal = cadena.toLowerCase();

    // Convertir la cadena en un array
    var letrasEspacios = cadenaOriginal.split("");

    // Eliminar los espacios en blanco
    var cadenaSinEspacios = "";
    for (i in letrasEspacios) {
        if (letrasEspacios[i] != " ") {
            cadenaSinEspacios += letrasEspacios[i];
        }
    }

    var letras = cadenaSinEspacios.split("");
    var letrasReves = cadenaSinEspacios.split("").reverse();

    var iguales = true;
    for (i in letras) {
        if (letras[i] == letrasReves[i]) {
            // Todo bien
        } else {
            // Alguna letra es distinta, por lo que ya no es un palindromo
            iguales = false;
            break;
        }
    }

    if (iguales) {
        resultado += " es un palíndromo";
    } else {
        resultado += " no es un palíndromo";
    }

    return resultado;
}