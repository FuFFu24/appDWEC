import { generaCartonAleatorio } from "./funcionesAux.js";

let listaPartidas = [];

onload = function() {
    cargarPartidas();
    generarTablaCarton();
    generarTablaNumerosActuales();
}

function generarTablaCarton() {
    let carrito = [];

    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    let posicionCarton = carrito.findIndex((partida) => partida.IdPartida == IdPartida);
    let tabla = document.getElementById("tablaCarton");
    if (posicionCarton != -1) {
        tabla.innerHTML = "<tr><td>NO TIENES CARTON</td></tr>";
    } else {

    }
}

function cargarPartidas() {
    $.getJSON("partidas.json", function(datos) {
        listaPartidas = datos;
        mostrarPartidasFuturas(listaPartidas);
    });
}

function mostrarPartidasFuturas(lista) {
    const tablaPartidasFuturas = document.getElementById("tablaPartidasFuturas");

    let tbody = tablaPartidasFuturas.querySelector("tbody");
    tbody.innerHTML = "";

    lista.forEach(element => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = element.Fecha;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = element.Hora;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = element.NumCartones;
        tr.appendChild(td);
        td = document.createElement("td");
        td.textContent = element.Premio;
        tr.appendChild(td);
        td = document.createElement("td");
        let boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = "Comprar";
        td.appendChild(boton);
        tr.appendChild(td);
        tbody.appendChild(tr);

        boton.addEventListener("click", function() {
            comprarCarton(`${element.IdPartida}`)
        });
    });
}

function comprarCarton(IdPartida) {
    let carrito = [];

    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    let entrada = {
        "IdPartida":IdPartida,
        "carton":generaCartonAleatorio()
    }
    carrito.push(entrada);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
