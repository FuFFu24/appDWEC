var listaProyectos = [];

function cargarProyectos() {
    listaProyectos.push(
        new Proyecto(1,"CEPSA 1","Proyecto para cepsa",7893),
        new Proyecto(2,"CEPSA 2","Proyecto para cepsa",5739),
        new Proyecto(3,"CEPSA 3","Proyecto para cepsa",9572),
        new Proyecto(4,"REPSOL","Proyecto para repsol",2845),
        new Proyecto(5,"BP 1","Proyecto para bp",4825),
        new Proyecto(6,"BP 2","Proyecto para bp",9347),
        new Proyecto(7,"PLENOIL","Proyecto para plenoil",2378)
    );
}

cargarProyectos();

function crearTablaProyectos() {
    var contenido="<table>";

    listaProyectos.forEach((proyecto)=>{
        contenido+="<tr>";
        contenido+=`<td> ${proyecto.nombre} </td>`;
        contenido+=`<td> ${proyecto.descripcion} </td>`;
        contenido+=`<td> ${proyecto.idCliente} </td>`;
        // Cuando quiero pintar todo el array lo hacemos asi, para recorrer todo el array
        /* for(propiedad in proyecto) {
            contenido += `<td>${proyecto[propiedad]}</td>`;
        }; */
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

function crearProyecto() {
    document.body.innerHTML += `<div id="nuevoProyecto" class="divCentrado">
        <h1>NUEVO PROYECTO</h1>
        <p>
        <span>Codigo</span>
        <input type="text" id="">
        </p>
    </div>`;
}