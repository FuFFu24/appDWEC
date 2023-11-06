window.onload = function () {
    const table = document.querySelector("#ruta");

    table.addEventListener("click", function (event) {
        if (event.target.tagName === "TD") {
            const columna = event.target.cellIndex;
            const fila = event.target.parentElement;

            const filas = document.querySelectorAll("#ruta tr");


            for (let fila of filas) {
                fila.cells[columna].style.backgroundColor = "red";
            }

            for (let celda of fila.cells) {
                celda.style.backgroundColor = "red";
            }
        }
    });

    let eliminarFilaColumna = setTimeout(function () {
        
    }, 3000)
}
