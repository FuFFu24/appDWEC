document.addEventListener("DOMContentLoaded", function () {
  let listaJuegosMesa = []; // Lista de todos los productos
  let juegosPorPagina = 12; // Cantidad predeterminada de juegos por página
  let paginaActual = 1;
  const selectOrdenar = document.getElementById("filtrar-ordenar");
  const productosPorPage = document.getElementById("productosPorPage");
  let resultados = []; // Almacena los resultados de la búsqueda

  const searchInput = document.getElementById("search-input");

  // Función para buscar productos y mostrar resultados
  function buscarProducto(termino) {
    const resultados = listaJuegosMesa.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );

    // Mostrar los resultados en el desplegable
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda-header"
    );
    resultadosDesplegable.innerHTML = "";

    if (resultados.length === 0) {
      resultadosDesplegable.innerHTML = "<p>No se encontraron resultados</p>";
    } else {
      resultadosDesplegable.innerHTML = '<div class="product-grid"></div>';

      return resultados.slice(0, 5); // Limitar a mostrar un máximo de 5 resultados.
    }
  }

  // Recupera la consulta de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  // Realiza la búsqueda y muestra los resultados en la página de resultados
  if (query) {
    // Realiza una solicitud para obtener la lista de productos desde productoJSON.json
    const productosPromise = fetch("../JSON/productoJSON.json").then(
      (response) => response.json()
    );

    // Realiza una solicitud para obtener la lista de productos desde accesorioJSON.json
    const accesoriosPromise = fetch("../JSON/accesorioJSON.json").then(
      (response) => response.json()
    );

    // Cuando ambas solicitudes se completen, combina las listas de productos
    Promise.all([productosPromise, accesoriosPromise])
      .then(([productos, accesorios]) => {
        // Combina las listas de productos en una sola lista
        listaJuegosMesa = [...productos, ...accesorios];

        // Filtra los resultados basados en la consulta
        resultados = buscarProductos(query, listaJuegosMesa);

        if (resultados.length > 0) {
          ordenarJuegos("masVendidos"); // Ordena por más vendidos inicialmente
          actualizarVista(resultados);
          actualizarSelectorPagina(resultados);
        } else {
          const resultadosDiv = document.querySelector(".resultados-busqueda");
          resultadosDiv.innerHTML =
            '<p class="sin-resultados">No se encontraron resultados.</p>';
        }
      })
      .catch((error) => {
        console.error("Error al cargar la lista de productos: " + error);
      });
  }

  function buscarProductos(consulta, listaProductos) {
    consulta = consulta.toLowerCase();
    return listaProductos.filter((producto) =>
      producto.nombre.toLowerCase().includes(consulta)
    );
  }

  function ordenarJuegos(criterio) {
    switch (criterio) {
      case "masVendidos":
        resultados.sort((a, b) => b.nota - a.nota);
        break;
      case "precioAltoBajo":
        resultados.sort((a, b) => b.precio - a.precio);
        break;
      case "precioBajoAlto":
        resultados.sort((a, b) => a.precio - b.precio);
        break;
      case "nuevo":
        resultados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        break;
      case "ordenAlfabetico":
        resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        break;
    }
    paginaActual = 1; // Restablece la página actual al ordenar
    actualizarVista(resultados);
    actualizarSelectorPagina(resultados);
  }

  function actualizarVista(resultados) {
    const resultadosDiv = document.querySelector(".resultados-busqueda");
    resultadosDiv.innerHTML = `
        <div class="product-grid"></div>
      `;
    const productGrid = document.querySelector(".product-grid");

    if (resultados.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
    } else {
      // Realiza la paginación basada en la página actual
      const inicio = (paginaActual - 1) * juegosPorPagina;
      const fin = inicio + juegosPorPagina;
      const resultadosPaginados = resultados.slice(inicio, fin);

      resultadosPaginados.forEach((producto) => {
        // Crea el HTML para cada producto y agrega al grid de resultados
        const juegoDestacado = document.createElement("div");
        juegoDestacado.className = "juego-destacado";

        if (producto.descuento) {
          // Calcula el precio con descuento
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

      resultadosDiv.appendChild(productGrid);
    }
  }

  // Función para mostrar los resultados de búsqueda en el desplegable
  function mostrarResultadosBusquedaEnDesplegable(resultados) {
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda-header"
    );
    resultadosDesplegable.innerHTML =
      '<div class="product-grid-desplegable"></div>';
    const productGrid = resultadosDesplegable.querySelector(
      ".product-grid-desplegable"
    );

    if (resultados) {
      resultados.forEach((producto) => {
        // Crea un nuevo juego destacado para el resultado de búsqueda
        const juegoDestacado = document.createElement("div");
        juegoDestacado.className = "juego-destacado";

        if (producto.descuento) {
          // Calcula el precio con descuento
          valorDescuento =
            (producto.precio * producto.porcentajeDescuento) / 100;
          precioVenta = (producto.precio - valorDescuento).toFixed(2);
        }

        // Crea el contenido del juego destacado para el resultado de búsqueda
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

        // Agrega el juego destacado al contenedor .product-grid en el desplegable
        productGrid.appendChild(juegoDestacado);
      });
    } else {
      resultadosDesplegable.innerHTML = `<p class="sin-resultados">😔 No hemos encontrado nada para <strong>"${searchInput.value}"</strong></p>`;
    }
  }

  // Escuchar el evento "input" en el campo de búsqueda
  searchInput.addEventListener("input", function () {
    const terminoBusqueda = searchInput.value;

    // Realiza la búsqueda y muestra los resultados en el desplegable
    const resultados = buscarProducto(terminoBusqueda);
    mostrarResultadosBusquedaEnDesplegable(resultados);
  });

  // Escuchar el evento "blur" para ocultar el desplegable cuando el campo pierde el foco
  searchInput.addEventListener("blur", function () {
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda-header"
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

  selectOrdenar.addEventListener("change", function () {
    const opcionSeleccionada = selectOrdenar.value;
    ordenarJuegos(opcionSeleccionada);
  });

  productosPorPage.addEventListener("change", function () {
    juegosPorPagina = parseInt(this.value);
    paginaActual = 1; // Restablece la página actual al cambiar la cantidad de juegos por página
    actualizarVista(resultados);
    actualizarSelectorPagina(resultados);
  });

  // Función para actualizar el selector de página
  function actualizarSelectorPagina(resultados) {
    const selectorPagina = document.querySelector(".page-selector ul");
    selectorPagina.innerHTML = "";

    // Calcula el rango de números de página para mostrar
    const numPaginas = Math.ceil(resultados.length / juegosPorPagina);
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
        actualizarVista(resultados);
        actualizarSelectorPagina(resultados);
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
        actualizarVista(resultados);
        actualizarSelectorPagina(resultados);
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
        actualizarVista(resultados);
        actualizarSelectorPagina(resultados);
      });
      selectorPagina.appendChild(botonPaginaSiguiente);
    }
  }
});
