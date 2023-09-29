window.addEventListener('load', () => {

    var listaNombres = [];

    function agregarNombre() {
        for (let index = 0; index < 10; index++) {
            var nombre = prompt("Introduce un nombre:");

            if (nombre) {
                var opcion = prompt("Donde lo ponemos? Inicio (I) Final (F):");
                if (opcion == "I") {
                    listaNombres.unshift(nombre);
                } else if (opcion == "F") {
                    listaNombres.push(nombre);
                } else {
                    alert("Valor incorrecto. Por defecto se pone al final.");
                    listaNombres.push(nombre);
                }
            }
            mostrarLista(listaNombres);
        }
    }

    agregarNombre();

    // Función para mostrar la lista de nombres
    function mostrarLista(listaNombres) {
        var lista = document.getElementById("lista");
        lista.innerHTML = ""; // Limpiar la lista anterior

        listaNombres.forEach((grupo) => {
            lista.innerHTML += `<option>${grupo}</option>`
        })
    }
});