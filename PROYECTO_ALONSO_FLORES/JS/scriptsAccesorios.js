document.addEventListener("DOMContentLoaded", function () {
  // Variables
  var listaAccesorios = [];
  var accesoriosPorPagina = 12; // Cantidad predeterminada de accesorios por página
  var paginaActual = 1;

  // Elementos del DOM
  const selectOrdenar = document.getElementById("filtrar-ordenar");
  const productosPorPage = document.getElementById("productosPorPage");
  const searchInput = document.getElementById("search-input");

  // Función para buscar productos y mostrar resultados
  function buscarProductos(termino) {
    const resultados = listaAccesorios.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );

    // Mostrar los resultados en el desplegable
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
  function mostrarAccesorios(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = `<div class="product-grid"></div>`;
    const productGrid = document.querySelector(".product-grid");

    lista.forEach((producto) => {
      // Crea un nuevo accesorio destacado
      const accesorioDestacado = document.createElement("div");
      accesorioDestacado.className = "accesorio-destacado";
      let valorDescuento, precioVenta;

      if (producto.descuento) {
        // Calcula el precio con descuento
        valorDescuento = (producto.precio * producto.porcentajeDescuento) / 100;
        precioVenta = (producto.precio - valorDescuento).toFixed(2);
      }

      // Crea el contenido del accesorio destacado
      const contenidoHTML = `
        <a href="#" class="web-page">
          <div class="img-accesorio">
            <img src="${producto.imagenURL}" alt="${producto.nombre}" />
          </div>
          <div class="datos-accesorio">
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

      // Agrega el contenido al accesorio destacado
      accesorioDestacado.innerHTML = contenidoHTML;

      // Agrega el accesorio destacado al contenedor .product-grid
      productGrid.appendChild(accesorioDestacado);
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
        // Crea un nuevo accesorio destacado para el resultado de búsqueda
        const accesorioDestacado = document.createElement("div");
        accesorioDestacado.className = "accesorio-destacado";
        let valorDescuento, precioVenta;

        if (producto.descuento) {
          // Calcula el precio con descuento
          valorDescuento =
            (producto.precio * producto.porcentajeDescuento) / 100;
          precioVenta = (producto.precio - valorDescuento).toFixed(2);
        }

        // Crea el contenido del accesorio destacado para el resultado de búsqueda
        const contenidoHTML = `
          <a href="#" class="web-page">
            <div class="img-accesorio">
              <img src="${producto.imagenURL}" alt="${producto.nombre}" />
            </div>
            <div class="datos-accesorio">
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

        // Agrega el contenido al accesorio destacado
        accesorioDestacado.innerHTML = contenidoHTML;

        // Agrega el accesorio destacado al contenedor .product-grid en el desplegable
        productGrid.appendChild(accesorioDestacado);
      });
    } else {
      resultadosDesplegable.innerHTML = `<p class="sin-resultados">😔 No hemos encontrado nada para <strong>"${searchInput.value}"</strong></p>`;
    }
  }

  // Escuchar el evento "input" en el campo de búsqueda
  searchInput.addEventListener("input", function () {
    const terminoBusqueda = searchInput.value;

    // Realiza la búsqueda y muestra los resultados en el desplegable
    const resultados = buscarProductos(terminoBusqueda);
    mostrarResultadosBusquedaEnDesplegable(resultados);
  });

  // Escuchar el evento "blur" para ocultar el desplegable cuando el campo pierde el foco
  searchInput.addEventListener("blur", function () {
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda"
    );
    resultadosDesplegable.innerHTML = "";
  });

  // Escuchar el evento "keydown" para redirigir a la página de resultados al presionar Enter
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const query = searchInput.value;
      if (query.trim() !== "") {
        // Redirigir a la página de resultados con la consulta en los parámetros de la URL
        window.location.href = `resultados.html?query=${encodeURIComponent(
          query
        )}`;
      }
    }
  });

  // Función para ordenar los accesorios
  function ordenarAccesorios(criterio) {
    switch (criterio) {
      case "masVendidos":
        listaAccesorios.sort((a, b) => b.nota - a.nota);
        break;
      case "precioAltoBajo":
        listaAccesorios.sort((a, b) => b.precio - a.precio);
        break;
      case "precioBajoAlto":
        listaAccesorios.sort((a, b) => a.precio - b.precio);
        break;
      case "nuevo":
        listaAccesorios.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        break;
      case "ordenAlfabetico":
        listaAccesorios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        break;
    }
  }

  // Función para actualizar la vista de los productos
  function actualizarVista() {
    mostrarAccesorios(
      listaAccesorios.slice(
        (paginaActual - 1) * accesoriosPorPagina,
        paginaActual * accesoriosPorPagina
      )
    );
  }

  // Escuchar el evento "change" en el selector de ordenar
  selectOrdenar.addEventListener("change", function () {
    const opcionSeleccionada = selectOrdenar.value;
    ordenarAccesorios(opcionSeleccionada);
    paginaActual = 1;
    actualizarVista();
    actualizarSelectorPagina();
  });

  // Escuchar el evento "change" en el selector de cantidad de productos por página
  productosPorPage.addEventListener("change", function () {
    accesoriosPorPagina = parseInt(this.value);
    paginaActual = 1;
    actualizarVista();
    actualizarSelectorPagina();
  });

  // Función para actualizar el selector de página
  function actualizarSelectorPagina() {
    const selectorPagina = document.querySelector(".page-selector ul");
    selectorPagina.innerHTML = "";

    // Calcula el rango de números de página para mostrar
    const numPaginas = Math.ceil(listaAccesorios.length / accesoriosPorPagina);
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

  // Función para cargar y mostrar los accesorios
  function cargarYMostrarAccesorios() {
    $.getJSON("../JSON/accesorioJSON.json", function (datos) {
      listaAccesorios = datos;
      ordenarAccesorios("masVendidos"); // Ordena inicialmente por más vendidos
      actualizarVista();
      actualizarSelectorPagina();
    });
  }

  cargarYMostrarAccesorios();
});
