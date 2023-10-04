function myConcat(separator) {
    var result = "", // initialize list
        i;
    // iterate through arguments
    for (i = 1; i < arguments.length; i++) {
        result += arguments[i] + separator;
    }
    return result;
}

// returns "red, orange, blue, "
console.log(myConcat(", ", "red", "orange", "blue"));

// returns "elephant; giraffe; lion; cheetah; "
console.log(myConcat("; ", "elephant", "giraffe", "lion", "cheetah"));

// returns "sage. basil. oregano. pepper. parsley. "
console.log(myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley"));

function mostrarMensaje2(x, y = 25) {
    alert(x);
    alert(y);
}
mostrarMensaje2(12);
mostrarMensaje2(12, 13);

function sumar() {
    var suma = 0;
    arguments.forEach(element => {
        suma += element
    });
    return suma
}
alert(suma(1, 2));
alert(suma(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));