function generarListaOrdenada(vec) {
    function comienzo() {
        s = '<ol>';
    }

    function fin() {
        s = s + '</ol>';
    }

    var s = '';
    comienzo();
    var f;
    for (f = 0; f < vec.length; f++) {
        s = s + '<li>' + vec[f] + '</li>';
    }
    fin();
    return s;
}
onload = function() {
    var opciones = ['Opción a', 'Opción b', 'Opción c', 'Opción d'];
    document.getElementById('div1').innerHTML = generarListaOrdenada(opciones);
}