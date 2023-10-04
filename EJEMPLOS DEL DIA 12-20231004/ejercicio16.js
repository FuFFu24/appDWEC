var elementos = [
    "Hidrógeno",
    "Helio",
    "Litio",
    "Beril­io"
];

elementos.find(function(elemento) {
    return elemento.charAt(0) == "H";
}); // "Hidrógeno"

elementos.find((elemento) => elemento.charAt(0) == "H");

elementos.map(function(elemento) {
    return elemento.length;
}); // [9, 5, 5, 7]

elementos.map((elemento) => {
    return elemento.length;
});