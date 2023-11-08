const listaVinilos = ['25996_1.jpg','25996_2.jpg','25997_1.jpg','25997_3.jpg','26650_3.jpg','26704_3.jpg','26868_1.jpg','26868_2.jpg','26869_1.jpg','26869_2.jpg','26873_1.jpg']
const listaLaminas = ['26873_2.jpg','27095_3.jpg','27356_3.jpg','27429_1.jpg','27429_2.jpg','27773_3.jpg','28155_1.jpg','28155_2.jpg','28192_3.jpg','28192_4.jpg','29776_3.jpg']
const listaOtros = ['30390_3.jpg','30473_1.jpg','31386_1.jpg','31386_2.jpg','31469_3.jpg']
const listaTodos = [...listaVinilos,...listaLaminas,...listaOtros]

const compras = [];
const alquileres = [];

function generarOptions() {
    let opciones = "";
    for (let i = 1; i <= 20; i++) {
        opciones += `<option>${i}</option>\n`;
    }
    return opciones;
}

function contratar(button) {
    const cantidadInput = button.nextElementSibling.nextElementSibling.nextElementSibling;
    const cantidad = cantidadInput.value;

    if (!isNaN(cantidad) && cantidad > 0) {
        const cuadro = button.previousElementSibling.previousElementSibling;
        const fotoLinkEntero = cuadro.src;
        const foto = fotoLinkEntero.replace("http://localhost:8080/enunciado/pagina2_files/", "");

        guardarCompra(foto, cantidad, "CONTRATAR");

        cantidadInput.style.display = "none";

        button.disabled = true;
    }
}

function alquilar(button) {
    const cantidadInput = button.nextElementSibling;
    const cantidad = parseInt(cantidadInput.value, 10);
    const duracionSelect = button.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    const duracion = duracionSelect.value;

    if (!isNaN(cantidad) && cantidad > 0 && duracion != "Escoge") {
        const cuadro = button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
        const fotoLinkEntero = cuadro.src;
        const foto = fotoLinkEntero.replace("http://localhost:8080/enunciado/pagina2_files/", "");

        guardarAlquiler(foto, cantidad, duracion, "ALQUILAR");

        const trEliminar = cantidadInput.parentNode;

        trEliminar.style.display = "none";
    }
}

function cargarCuadros(lista) {
    const exposicion = document.getElementById("exposicion");
    exposicion.innerHTML = "";
    const tabla = document.createElement("table");
    tabla.style.border = "2px solid black";
    let contadorTds = 1;

    let tr = document.createElement("tr");

    for (let i = 0; i < lista.length; i++) {
        let contenido = `
            <img src="./pagina2_files/${lista[i]}" alt=""><br>
            <button type="button" onclick="contratar(this)">CONTRATAR</button><br>
            <button type="button" onclick="alquilar(this)">ALQUILAR</button>
            <input type="text" name="cantidad" id="cantidad" style="width: 30px"><br>
            <label for="duracion">DURACION: </label>
            <select name="duracion" id="duracion">
                <option>Escoge</option>
                ${generarOptions()}
            </select>
        `;

        if (contadorTds % 4 === 0) {
            tr = document.createElement("tr");
        }

        const td = document.createElement("td");
        td.style.border = "2px solid black";
        td.innerHTML = contenido;
        tr.appendChild(td);

        if (contadorTds % 4 === 0 || i === lista.length - 1) {
            tabla.appendChild(tr);
        }

        contadorTds++;
    }

    exposicion.appendChild(tabla);
}

  function guardarCompra(foto, cantidad, operacion) {
    compras.push({foto, cantidad, operacion});
  }

  function guardarAlquiler(foto, cantidad, duracion, operacion) {
    alquileres.push({foto, cantidad, duracion, operacion});
  }

function mostrarCompras() {
  compras.sort((a, b) => b.cantidad - a.cantidad);
  const ventana = window.open('', 'COMPRA', 'width=400,height=400');
  ventana.document.write('<h1>COMPRA</h1>');
  ventana.document.write('<p>IMAGEN --- OPERACION --- CANTIDAD</p>');
  for (const compra of compras) {
    ventana.document.write(`<p>${compra.foto} --- ${compra.operacion} --- ${compra.cantidad}</p>`);
  }
  ventana.document.write('<button onclick="window.close()">Cerrar</button>');
}

function mostrarAlquileres() {
  alquileres.sort((a, b) => a.duracion - b.duracion);
  const ventana = window.open('', 'ALQUILER', 'width=400,height=400');
  ventana.document.write('<h1>ALQUILER</h1>');
  ventana.document.write('<p>IMAGEN --- OPERACION --- CANTIDAD --- DURACION</p>');
  for (const alquiler of alquileres) {
    ventana.document.write(`<p>${alquiler.foto} --- ${alquiler.operacion} --- ${alquiler.cantidad} --- ${alquiler.duracion}</p>`);
  }
  ventana.document.write('<button onclick="window.close()">Cerrar</button>');
}

function mostrarTodasLasOperaciones() {
  const operaciones = [...compras, ...alquileres];
  operaciones.sort((a, b) => b.cantidad - a.cantidad);
  const ventana = window.open('', 'Todas las operaciones', 'width=400,height=400');
  ventana.document.write('<h1>TODAS LAS OPERACIONES</h1>');
  ventana.document.write('<p>IMAGEN --- OPERACION --- CANTIDAD --- DURACION</p>');
  for (const operacion of operaciones) {
    if (compras.find((c) => c.foto === operacion.foto)) {
      ventana.document.write(`${operacion.foto} --- ${operacion.operacion} --- ${operacion.cantidad}</p>`);
    } else {
      ventana.document.write(`${operacion.foto} --- ${operacion.operacion} --- ${operacion.cantidad} --- ${operacion.duracion}</p>`);
    }
  }
  ventana.document.write('<button onclick="window.close()">Cerrar</button>');
}

  window.onload = function () {
    cargarCuadros(listaTodos);

    const filtroCuadros = document.querySelector("#central select");

    filtroCuadros.addEventListener("change", function () {
        const tipoSeleccionado = filtroCuadros.value;
        if (tipoSeleccionado == "Vinilos") {
            cargarCuadros(listaVinilos);
        } else if (tipoSeleccionado == "Laminas") {
            cargarCuadros(listaLaminas);
        } else if (tipoSeleccionado == "Otros") {
            cargarCuadros(listaOtros);
        } else if (tipoSeleccionado == "Escoge un valor") {
            cargarCuadros(listaTodos);
        }
    });

    const verCompras = document.querySelector("#derecha").querySelectorAll("a")[0];
    const verAlquileres = document.querySelector("#derecha").querySelectorAll("a")[1];
    const verOperaciones = document.querySelector("#derecha").querySelectorAll("a")[2];

    verCompras.addEventListener("click", mostrarCompras);
    verAlquileres.addEventListener("click", mostrarAlquileres);
    verOperaciones.addEventListener("click", mostrarTodasLasOperaciones);
}
