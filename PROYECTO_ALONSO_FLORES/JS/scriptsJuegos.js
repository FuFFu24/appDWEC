document.addEventListener("DOMContentLoaded", function () {
  var listaJuegosMesa = [];

  function cargarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;
      ordenarMasVendidos(listaJuegosMesa);
    });
  }

  cargarJuegosMesa();

  // Función para crear el HTML de un producto
  function mostrarJuegosMesa(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = `
      <div class="product-grid"></div>
      `;
    const productGrid = document.querySelector(".product-grid");

    lista.forEach((producto) => {
      // Crea un nuevo juego destacado
      const juegoDestacado = document.createElement("div");
      juegoDestacado.className = "juego-destacado";

      // Crea el contenido del juego destacado
      const contenidoHTML = `
          <a href="#" class="web-page">
            <div class="img-juego">
              <img src="${producto.imagenURL}" alt="${producto.nombre}" />
            </div>
            <div class="datos-juego">
              <p>${producto.nombre}</p>
              <h3>${producto.precio} €</h3>
            </div>
          </a>
          <a href="#" class="btn-anadir-carrito">Añadir al carrito</a>
        `;

      // Agrega el contenido al juego destacado
      juegoDestacado.innerHTML = contenidoHTML;

      // Agrega el juego destacado al contenedor .product-grid
      productGrid.appendChild(juegoDestacado);
    });
  }

  function ordenarMasVendidos(lista) {
    // ATENCION, CAMBIAR EN UN FUTURO
    lista.sort((a, b) => b.nota - a.nota);
    mostrarJuegosMesa(lista);
  }

  function ordenarPrecioAltoBajo(lista) {
    // Ordena por precio de alto a bajo.
    lista.sort((a, b) => b.precio - a.precio);
    mostrarJuegosMesa(lista);
  }

  function ordenarPrecioBajoAlto(lista) {
    // Ordena por precio de bajo a alto.
    lista.sort((a, b) => a.precio - b.precio);
    mostrarJuegosMesa(lista);
  }

  function ordenarNuevo(lista) {
    // Ordenar por fecha de mas nuevo a mas antiguo.
    lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    mostrarJuegosMesa(lista);
  }

  function ordenarAlfabetico(lista) {
    // Ordena alfabéticamente por nombre.
    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarJuegosMesa(lista);
  }

  // Obtén el elemento select
  const selectOrdenar = document.getElementById("filtrar-ordenar");

  // Agrega un evento change para detectar la selección
  selectOrdenar.addEventListener("change", function () {
    const opcionSeleccionada = selectOrdenar.value;

    // Llama a la función de ordenación correspondiente según la opción seleccionada
    if (opcionSeleccionada === "masVendidos") {
      ordenarMasVendidos(listaJuegosMesa);
    } else if (opcionSeleccionada === "precioAltoBajo") {
      ordenarPrecioAltoBajo(listaJuegosMesa);
    } else if (opcionSeleccionada === "precioBajoAlto") {
      ordenarPrecioBajoAlto(listaJuegosMesa);
    } else if (opcionSeleccionada === "nuevo") {
      ordenarNuevo(listaJuegosMesa);
    } else if (opcionSeleccionada === "ordenAlfabetico") {
      ordenarAlfabetico(listaJuegosMesa);
    }
  });
});

// --------------------------------------------------

/* document.addEventListener("DOMContentLoaded", function () {
  cargarJuegosMesa();
});

var listaJuegosMesa = [];

function cargarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;
      mostrarJuegosMesa(listaJuegosMesa);
    });
  }

  // Función para crear el HTML de un producto
  function mostrarJuegosMesa(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = `
    <h2 class="titulo">Juegos de mesa</h2>
            <p class="introduccion">¡Encuentra tu <strong>juego de mesa</strong> perfecto en este listado!</p>
            <p class="filtrar-ordenar">
                <label for="filtrar-ordenar">Ordenar por </label>
                <select name="filtrar-ordenar" id="filtrar-ordenar" onchange="filtrarOrdenar(event)">
                    <option value="masVendidos">Más Vendidos</option>
                    <option value="precioAltoBajo">Precio: alto-bajo
                    </option>
                    <option value="precioBajoAlto">Precio: bajo-alto</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="ordenAlfabetico">Orden Alfabético</option>
                </select>
            </p>
      <div class="product-grid"></div>
      `;
    const productGrid = document.querySelector(".product-grid");

    lista.forEach((producto) => {
      // Crea un nuevo juego destacado
      const juegoDestacado = document.createElement("div");
      juegoDestacado.className = "juego-destacado";

      // Crea el contenido del juego destacado
      const contenidoHTML = `
          <a href="#" class="web-page">
            <div class="img-juego">
              <img src="${producto.imagenURL}" alt="${producto.nombre}" />
            </div>
            <div class="datos-juego">
              <p>${producto.nombre}</p>
              <h3>${producto.precio} €</h3>
            </div>
          </a>
          <a href="#" class="btn-anadir-carrito">Añadir al carrito</a>
        `;

      // Agrega el contenido al juego destacado
      juegoDestacado.innerHTML = contenidoHTML;

      // Agrega el juego destacado al contenedor .product-grid
      productGrid.appendChild(juegoDestacado);
    });
  }

  function filtrarOrdenar(evento) {
    const opcionSeleccionada = evento.target.value;

    // Llama a la función de ordenación correspondiente según la opción seleccionada
    if (opcionSeleccionada === "masVendidos") {
      ordenarMasVendidos(listaJuegosMesa);
    } else if (opcionSeleccionada === "precioAltoBajo") {
      ordenarPrecioAltoBajo(listaJuegosMesa);
    } else if (opcionSeleccionada === "precioBajoAlto") {
      ordenarPrecioBajoAlto(listaJuegosMesa);
    } else if (opcionSeleccionada === "nuevo") {
      ordenarNuevo(listaJuegosMesa);
    } else if (opcionSeleccionada === "ordenAlfabetico") {
      ordenarAlfabetico(listaJuegosMesa);
    }
  };

  function ordenarMasVendidos(lista) {
    // ATENCION, CAMBIAR EN UN FUTURO
    lista.sort((a, b) => b.nota - a.nota);
    mostrarJuegosMesa(lista);
  }

  function ordenarPrecioAltoBajo(lista) {
    // Ordena por precio de alto a bajo.
    lista.sort((a, b) => b.precio - a.precio);
    mostrarJuegosMesa(lista);
  }

  function ordenarPrecioBajoAlto(lista) {
    // Ordena por precio de bajo a alto.
    lista.sort((a, b) => a.precio - b.precio);
    mostrarJuegosMesa(lista);
  }

  function ordenarNuevo(lista) {
    // Ordenar por fecha de mas nuevo a mas antiguo.
    lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    mostrarJuegosMesa(lista);
  }

  function ordenarAlfabetico(lista) {
    // Ordena alfabéticamente por nombre.
    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarJuegosMesa(lista);
  } */