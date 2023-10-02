var capacidad = 16; // Number
var apellidos = "Salas"; // String
var persona = { nombre: "John", apellidos: "Doe", edad: 55 }; // Object
var coches = ["Saab", "Volvo", "BMW"]; // array

console.log(isArray(coches)); // return true

console.log(16 + "DAW");
console.log(6 + 4 + "2DAW");
console.log("2DAW" + 16 + 4);

console.log(capacidad);
console.log(capacidad + 4);
capacidad = "HOLA";
console.log(capacidad + 4);


var y = 123e5; // 12300000
console.log(y);
var z = 123e-5; // 0.00123
console.log(z);


var x = 5;
var y = 5;
var z = 6;
console.log(x == y); // returns true
console.log(x == z); // returns false


console.log(typeof ""); // Returns "string"
console.log(typeof "John"); // Returns "string"

console.log(typeof(3)); // Returns "number"
console.log(typeof(3 + 4)); // Returns "number"

var avion;


console.log(typeof "John"); // Returns "string"
console.log(typeof 3.14); // Returns "number"
console.log(typeof true); // Returns "boolean"
console.log(typeof false); // Returns "boolean"
console.log(typeof avion); // returns "undefined"
console.log(typeof nuevo); // Returns "undefined"

console.log(typeof persona); // Returns "object"

console.log(typeof coches); // Returns "object" (not "array")

console.log(typeof null) // Returns "object"

console.log(typeof
        function myFunc() {}) // Returns "function"