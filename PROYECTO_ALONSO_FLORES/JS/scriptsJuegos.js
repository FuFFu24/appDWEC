document.addEventListener("DOMContentLoaded", function () {
  var listaJuegosMesa = [];
  var juegosPorPagina = 12; // Cantidad predeterminada de juegos por página
  var paginaActual = 1;

  const selectOrdenar = document.getElementById("filtrar-ordenar");
  const productosPorPage = document.getElementById("productosPorPage");

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

      if (producto.descuento) {
        // Calcula el precio con descuento
        valorDescuento = (producto.precio * producto.porcentajeDescuento) / 100;
        precioVenta = (producto.precio - valorDescuento).toFixed(2);
      }

      // Crea el contenido del juego destacado
      const contenidoHTML = `
      <a href="#" class="web-page">
        <div class="img-juego">
          <img src="${producto.imagenURL}" alt="${producto.nombre}" />
        </div>
        <div class="datos-juego">
          <p>${producto.nombre}</p>
          <p>
            <span class="precio-con-descuento">${
              producto.descuento ? precioVenta : producto.precio
            } €</span>
            <span class="precio-original">${
              producto.descuento ? " Antes " + producto.precio + " €" : ""
            }</span>
          </p>
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

  function ordenarJuegos(criterio) {
    switch (criterio) {
      case "masVendidos":
        listaJuegosMesa.sort((a, b) => b.nota - a.nota);
        break;
      case "precioAltoBajo":
        listaJuegosMesa.sort((a, b) => b.precio - a.precio);
        break;
      case "precioBajoAlto":
        listaJuegosMesa.sort((a, b) => a.precio - b.precio);
        break;
      case "nuevo":
        listaJuegosMesa.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        break;
      case "ordenAlfabetico":
        listaJuegosMesa.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        break;
    }
  }

  function actualizarVista() {
    mostrarJuegosMesa(
      listaJuegosMesa.slice(
        (paginaActual - 1) * juegosPorPagina,
        paginaActual * juegosPorPagina
      )
    );
  }

  selectOrdenar.addEventListener("change", function () {
    const opcionSeleccionada = selectOrdenar.value;
    ordenarJuegos(opcionSeleccionada);
    paginaActual = 1;
    actualizarVista();
    actualizarSelectorPagina();
  });

  productosPorPage.addEventListener("change", function () {
    juegosPorPagina = parseInt(this.value);
    paginaActual = 1;
    actualizarVista();
    actualizarSelectorPagina();
  });

  // Función para actualizar el selector de página
  function actualizarSelectorPagina() {
    const selectorPagina = document.querySelector(".page-selector ul");
    selectorPagina.innerHTML = "";

    // Calcula el rango de números de página para mostrar
    const numPaginas = Math.ceil(listaJuegosMesa.length / juegosPorPagina);
    const numBotones = 5; // Siempre mostramos 5 botones
    let inicio = Math.max(1, paginaActual - Math.floor(numBotones / 2));
    let fin = inicio + numBotones - 1;

    if (fin > numPaginas) {
      fin = numPaginas;
      inicio = Math.max(1, fin - numBotones + 1);
    }

    // Botón de página anterior (si no estamos en la primera página)
    if (paginaActual > 1) {
      const botonPaginaAnterior = document.createElement("li");
      botonPaginaAnterior.className = "page-anterior";
      botonPaginaAnterior.innerHTML =
        '<img src="../IMG/LOGOS/left-arrow-verde.png" alt="">';
      botonPaginaAnterior.addEventListener("click", function () {
        paginaActual--;
        actualizarVista();
        actualizarSelectorPagina();
      });
      selectorPagina.appendChild(botonPaginaAnterior);
    }

    // Botones numéricos
    for (let i = inicio; i <= fin; i++) {
      const botonNumero = document.createElement("li");
      botonNumero.className =
        "page-numero" + (i === paginaActual ? " current-page" : "");
      botonNumero.textContent = i;
      botonNumero.addEventListener("click", function () {
        paginaActual = i;
        actualizarVista();
        actualizarSelectorPagina();
      });
      selectorPagina.appendChild(botonNumero);
    }

    // Botón de página siguiente (si no estamos en la última página)
    if (paginaActual < numPaginas) {
      const botonPaginaSiguiente = document.createElement("li");
      botonPaginaSiguiente.className = "page-siguiente";
      botonPaginaSiguiente.innerHTML =
        '<img src="../IMG/LOGOS/right-arrow-verde.png" alt="">';
      botonPaginaSiguiente.addEventListener("click", function () {
        paginaActual++;
        actualizarVista();
        actualizarSelectorPagina();
      });
      selectorPagina.appendChild(botonPaginaSiguiente);
    }
  }

  function cargarYMostrarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;
      ordenarJuegos("masVendidos"); // Ordena inicialmente por más vendidos
      actualizarVista();
      actualizarSelectorPagina();
    });
  }

  cargarYMostrarJuegosMesa();

  /* // Utiliza event delegation para manejar los eventos de mouseover y mouseout
  document.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("page-anterior")) {
      e.target.querySelector("img").src = "../IMG/LOGOS/left-arrow-verde.png";
    } else if (e.target.classList.contains("page-siguiente")) {
      e.target.querySelector("img").src = "../IMG/LOGOS/right-arrow-verde.png";
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("page-anterior")) {
      e.target.querySelector("img").src = "../IMG/LOGOS/left-arrow-gris.png";
    } else if (e.target.classList.contains("page-siguiente")) {
      e.target.querySelector("img").src = "../IMG/LOGOS/right-arrow-gris.png";
    }
  }); */

  /* // Agrega los eventos para las flechas de navegación aquí
  const imgFlechaIzquierda = document.querySelector(".page-anterior img");
  const imgFlechaDerecha = document.querySelector(".page-siguiente img");

  // Cuando se realiza un hover en la flecha izquierda
  imgFlechaIzquierda.addEventListener("mouseover", function () {
    imgFlechaIzquierda.src = "../IMG/LOGOS/left-arrow-verde.png";
  });

  // Cuando se quita el hover de la flecha izquierda
  imgFlechaIzquierda.addEventListener("mouseout", function () {
    imgFlechaIzquierda.src = "../IMG/LOGOS/left-arrow-gris.png";
  });

  // Cuando se realiza un hover en la flecha derecha
  imgFlechaDerecha.addEventListener("mouseover", function () {
    imgFlechaDerecha.src = "../IMG/LOGOS/right-arrow-verde.png";
  });

  // Cuando se quita el hover de la flecha derecha
  imgFlechaDerecha.addEventListener("mouseout", function () {
    imgFlechaDerecha.src = "../IMG/LOGOS/right-arrow-gris.png";
  }); */
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
