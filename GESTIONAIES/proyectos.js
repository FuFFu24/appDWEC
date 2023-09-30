var listaProyectos = [];

function cargarProyectos() {
    listaProyectos.push(
        "CEPSA 1",
        "CEPSA 2",
        "CEPSA 3",
        "REPSOL",
        "BP 1",
        "BP 2",
        "PLENOIL"
    );
}

cargarProyectos();

function crearTablaProyectos() {
    var contenido="<table>";

    listaProyectos.forEach((proyecto)=>{
        contenido+="<tr>";
        contenido+=`<td> ${proyecto} </td>`;
        contenido+="</tr>";
    })

    contenido+="</table>";

    document.getElementById("central").innerHTML=contenido;
}

onload = function() {
    crearTablaProyectos();
};

function volver() {
    location.href = "aterrizaje.html";
}

function ordenarTablaProyectosAlf() {
    listaProyectos.sort((a,b)=>{
        if (a[0]>b[0]) {
            return 1
        } else {
            return -1
        }
    })
    crearTablaProyectos();
}

function imprimirPantallaAct() {
    window.print();
}