function saltar() {
    var palabra = "";
    do {
        palabra = prompt("Dame una clave: ");
    } while (palabra != clave)

    location.href = direccion;
}