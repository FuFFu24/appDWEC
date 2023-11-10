window.onload = function () {
    const listaTds = [...document.getElementById("ruta").getElementsByTagName("td")]
    listaTds.forEach((celda) => {
        celda.addEventListener("click",pintar);
    })
}

function pintar(evento) {
    /* const listaEntera = [...document.getElementById("ruta").getElementsByTagName("td")]
    listaEntera.forEach((fila => {
        fila.style.backgroundColor = "white";
    })) */

    evento.target.parentNode.style.backgroundColor = "red";

    let columna = evento.target.cellIndex;

    /* let contador = 0;
    while (contador < evento.target.parentNode.children.length && 
        evento.target.parentNode.children[contador] != evento.target) {
        contador++;
    } */

    const listaTrs = [...document.getElementById("ruta").getElementsByTagName("tr")]
    listaTrs.forEach((fila => {
        fila.children[columna].style.backgroundColor = "red";
    }))
}