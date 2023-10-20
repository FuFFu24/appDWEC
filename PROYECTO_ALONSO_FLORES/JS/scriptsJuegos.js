document.addEventListener("DOMContentLoaded", function () {
  var listaJuegosMesa = [];
  var juegosPorPagina = 12; // Cantidad predeterminada de juegos por página
  var paginaActual = 1;

  const selectOrdenar = document.getElementById("filtrar-ordenar");
  const productosPorPage = document.getElementById("productosPorPage");
  const searchInput = document.getElementById("search-input");

  // Función para buscar productos y mostrar resultados
  function buscarProductos(termino) {
    const resultados = listaJuegosMesa.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );

    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda"
    );
    resultadosDesplegable.innerHTML = "";

    if (resultados.length === 0) {
      resultadosDesplegable.innerHTML = "<p>No se encontraron resultados</p>";
    } else {
      resultadosDesplegable.innerHTML = '<div class="product-grid"></div>';

      return resultados.slice(0, 5); // Limitar a mostrar un máximo de 5 resultados.
    }
  }

  // Función para crear el HTML de un producto
  function mostrarJuegosMesa(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = `<div class="product-grid"></div>`;
    const productGrid = document.querySelector(".product-grid");

    lista.forEach((producto) => {
      const juegoDestacado = document.createElement("div");
      juegoDestacado.className = "juego-destacado";

      if (producto.descuento) {
        valorDescuento = (producto.precio * producto.porcentajeDescuento) / 100;
        precioVenta = (producto.precio - valorDescuento).toFixed(2);
      }

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

      juegoDestacado.innerHTML = contenidoHTML;
      productGrid.appendChild(juegoDestacado);
    });
  }

  // Función para mostrar los resultados de búsqueda en el desplegable
  function mostrarResultadosBusquedaEnDesplegable(resultados) {
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda"
    );
    resultadosDesplegable.innerHTML =
      '<div class="product-grid-desplegable"></div>';
    const productGrid = resultadosDesplegable.querySelector(
      ".product-grid-desplegable"
    );

    if (resultados) {
      resultados.forEach((producto) => {
        const juegoDestacado = document.createElement("div");
        juegoDestacado.className = "juego-destacado";

        if (producto.descuento) {
          valorDescuento =
            (producto.precio * producto.porcentajeDescuento) / 100;
          precioVenta = (producto.precio - valorDescuento).toFixed(2);
        }

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

        juegoDestacado.innerHTML = contenidoHTML;
        productGrid.appendChild(juegoDestacado);
      });
    } else {
      resultadosDesplegable.innerHTML = `<p class="sin-resultados">😔 No hemos encontrado nada para <strong>"${searchInput.value}"</strong></p>`;
    }
  }

  searchInput.addEventListener("input", function () {
    const terminoBusqueda = searchInput.value;
    const resultados = buscarProductos(terminoBusqueda);
    mostrarResultadosBusquedaEnDesplegable(resultados);
  });

  searchInput.addEventListener("blur", function () {
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda"
    );
    resultadosDesplegable.innerHTML = "";
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const query = searchInput.value;
      if (query.trim() !== "") {
        window.location.href = `resultados.html?query=${encodeURIComponent(
          query
        )}`;
      }
    }
  });

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

  function actualizarSelectorPagina() {
    const selectorPagina = document.querySelector(".page-selector ul");
    selectorPagina.innerHTML = "";

    const numPaginas = Math.ceil(listaJuegosMesa.length / juegosPorPagina);
    const numBotones = 5;
    let inicio = Math.max(1, paginaActual - Math.floor(numBotones / 2));
    let fin = inicio + numBotones - 1;

    if (fin > numPaginas) {
      fin = numPaginas;
      inicio = Math.max(1, fin - numBotones + 1);
    }

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
      ordenarJuegos("masVendidos");
      actualizarVista();
      actualizarSelectorPagina();
    });
  }

  cargarYMostrarJuegosMesa();
});
