onload = () => {
    solicitarCursos();
    solicitarEntrenadores();
    filtrarTurno(listaCursos);
}

let listaCursos = [];
let listaEntrenadores = [];

function solicitarCursos() {
    $.getJSON("listaCursos.php", {}, (datos) => {
        listaCursos = datos;
        pintarCursos(listaCursos);
    });
}

function solicitarEntrenadores() {
    $.getJSON("listaEntrenadores.php", {}, (datos) => {
        listaEntrenadores = datos;
    });
}

function pintarCursos(listaCursos) {
    let divCentral = document.getElementById("central");
    divCentral.innerHTML = "";
    let tabla = document.createElement("table");
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    listaCursos.forEach((element, index) => {
        let td = document.createElement("td");
        td.innerHTML += `
            <img src="${element.curso_imagen}" alt="" height="75" width="75">
            <p>BAILE: ${element.curso_descripcion}</p>
            <p>PRECIO: ${element.curso_precio}</p>
            <p>DIA: ${element.curso_dia}</p>
            <p>TURNO: ${element.curso_horario }</p>
            <button type="button" id="contratar">CONTRATAR</button>
            <button type="button" id="descontratar">DESCONTRATAR</button>
        `;
        if (index % 4 == 0) {
            tr = document.createElement("tr");
            tbody.appendChild(tr);
        }
        tr.appendChild(td);
    });
    tabla.appendChild(tbody);
    divCentral.appendChild(tabla);
}

function filtrarTurno() {
    let selectTurno = document.querySelectorAll("select")[0];

    selectTurno.addEventListener("change", function() {
        let pFiltros = document.querySelector("#superior p");

        pFiltros.innerHTML = "";

        listaCursos.forEach(element => {
            if (element.curso_horario === selectTurno.value) {
                let input = document.createElement("input");
                input.id = element.curso_id;
                input.name = "entrenador";
                input.type = "radio";

                let label = document.createElement("label");
                label.textContent = element.curso_entrenador;

                pFiltros.appendChild(input);
                pFiltros.appendChild(label);
            }
        });
    });
}