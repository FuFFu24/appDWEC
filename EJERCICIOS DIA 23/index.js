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
  listaComidas.forEach((element) => {
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
  let posicion = carrito.findIndex((compra) => compra.idComida === idComida);
  if (posicion !== -1) {
    carrito[posicion].cantidad++;
  } else {
    let compra = {
      idComida: idComida,
      cantidad: 1,
    };
    carrito.push(compra);
  }

  actualizarCarrito();

  if (document.querySelector("#carrito").style.display === "block") {
    divCarritoF();
  }
}

function eliminar(idComida) {
  let posicion = carrito.findIndex((compra) => compra.idComida === idComida);
  if (posicion !== -1 && carrito[posicion].cantidad > 1) {
    carrito[posicion].cantidad--;
  } else if (posicion !== -1 && carrito[posicion].cantidad === 1) {
    carrito.splice(posicion, 1);
  }
  
  actualizarCarrito();

  if (document.querySelector("#carrito").style.display === "block") {
    divCarritoF();
  }
}

function actualizarCarrito() {
  // document.cookie = "carrito=" + JSON.stringify(carrito);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  document.querySelector("#contCarrito").innerHTML = carrito.length;
}

function leerCarritoInicial() {
  /* let datosCookie = document.cookie.split(";");
  datosCookie.forEach((element) => {
    let nombre = element.trim().split("=")[0];
    let valor = element.trim().split("=")[1];
    if (nombre === "carrito") {
      carrito = JSON.parse(valor);
    }
  }); */

  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }

  document.querySelector("#contCarrito").innerHTML = carrito.length;
}

function divCarritoF() {
  let divCarrito = document.querySelector("#carrito");
  divCarrito.innerHTML = "";
  divCarrito.style.display = "block";
  let tabla = document.createElement("table");
  let precioTotal = 0;

  carrito.forEach((element) => {
    let comida = listaComidas.find(
      (comida) => comida.idComida === element.idComida
    );
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
    <tr>
      <td colspan="4">Total: ${precioTotal} €</td>
    </tr>
  `;
  divCarrito.appendChild(tabla);
}

window.onload = function () {
  leerCarritoInicial();

  document
    .querySelector("img[alt='carrito']")
    .addEventListener("click", function () {
      let divCarrito = document.querySelector("#carrito");
      if (
        divCarrito.style.display === "none" ||
        divCarrito.style.display === ""
      ) {
        divCarritoF();
      } else {
        divCarrito.style.display = "none";
      }
    });
};
