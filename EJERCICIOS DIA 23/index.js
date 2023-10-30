var listaComidas = [];
var carrito = [];

$.getJSON("comidas.json", (datos) => {
    listaComidas = datos;
    cargarComidas(listaComidas);
});

function cargarComidas(listaComidas) {
    let divCentral = document.querySelector("#central");
    divCentral.innerHTML = "";
    let tabla = document.createElement("table");
    tabla.className = "tablaComidas";
    listaComidas.forEach(element => {
        tabla.innerHTML += `
        <tr>
            <th>${element.idComida}</th>
            <td>${element.nombreCorto}</td>
            <td>${element.descripcion}</td>
            <td>${element.precio}</td>
            <td><button type="button" onclick="comprar(${element.idComida})">COMPRAR</button></td>
            <td><button type="button" onclick="eliminar(${element.idComida})">ELIMINAR</button></td>
        </tr>
    `;
    });
    divCentral.appendChild(tabla);
}

function comprar(idComida) {
    let posicion = carrito.findIndex((compra) => compra.idComida == idComida);
    if (posicion != -1) {
        carrito[posicion].cantidad++;
    } else {
        let compra = {
            "idComida": idComida,
            "cantidad": 1
        }
        carrito.push(compra);
    }
    document.cookie = "carrito=" + JSON.stringify(carrito);
    document.querySelector("#contCarrito").innerHTML = carrito.length;

    if (document.querySelector("#carrito").style.display == "block") {
        divCarrito();
    }
}

function eliminar(idComida) {
    let posicion = carrito.findIndex((compra) => compra.idComida == idComida);
    if (posicion != -1 && carrito[posicion].cantidad > 1) {
        carrito[posicion].cantidad--;
    } else if (posicion != -1 && carrito[posicion].cantidad == 1) {
        carrito.splice(posicion, 1)
    }
    document.cookie = "carrito=" + JSON.stringify(carrito);
    document.querySelector("#contCarrito").innerHTML = carrito.length;

    if (document.querySelector("#carrito").style.display == "block") {
        divCarrito();
    }
}

function leerCarritoCookie() {
    let datosCookie = document.cookie.split(";");
    datosCookie.forEach(element => {
        let nombre = element.split("=")[0];
        let valor = element.split("=")[1];
        if (nombre == "carrito") {
            carrito = JSON.parse(valor);
        }
    });
    document.querySelector("#contCarrito").innerHTML = carrito.length;
}

function divCarrito() {
    let divCarrito = document.querySelector("#carrito");
    divCarrito.innerHTML = "";
    divCarrito.style.display = "block";
    let tabla = document.createElement("table");
    let precioTotal = 0;
    carrito.forEach(element => {
        let comida = listaComidas.find(comida => comida.idComida === element.idComida);
        if (comida) {
            let nombre = comida.nombreCorto;
            let subtotal = comida.precio * element.cantidad;
            precioTotal += subtotal;
            tabla.innerHTML += `
                <tr>
                    <td>${nombre}</td>
                    <td>${element.cantidad}</td>
                    <td>${subtotal} €</td>
                    <td><button type="button" onclick="eliminar(${element.idComida})" class="botonEliminar">X</button></td>
                </tr>
            `;
        }
    });
    tabla.innerHTML += `
        <p>Total = ${precioTotal}</p>
    `;
    divCarrito.appendChild(tabla);
}

window.onload = function() {
    leerCarritoCookie();

    document.querySelector("img[alt='carrito']").addEventListener("click", function(){
        divCarrito();
    });
}