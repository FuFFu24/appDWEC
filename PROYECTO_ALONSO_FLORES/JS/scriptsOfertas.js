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
  function mostrarJuegosMesa(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = `
      <div class="product-grid"></div>
    `;
    const productGrid = document.querySelector(".product-grid");

    lista.forEach((producto) => {
      if (producto.descuento) {
        // Crea un nuevo juego destacado
        const juegoDestacado = document.createElement("div");
        juegoDestacado.className = "juego-destacado";

        // Calcula el precio con descuento
        valorDescuento = (producto.precio * producto.porcentajeDescuento) / 100;
        precioVenta = (producto.precio - valorDescuento).toFixed(2);

        // Crea el contenido del juego destacado
        const contenidoHTML = `
            <a href="#" class="web-page">
              <div class="img-juego">
                <img src="${producto.imagenURL}" alt="${producto.nombre}" />
              </div>
              <div class="datos-juego">
                <p>${producto.nombre}</p>
                <p>
                  <span class="precio-con-descuento">${precioVenta} €</span>
                  <span class="precio-original">Antes ${producto.precio} €</span>
                </p>
              </div>
            </a>
            <a href="#" class="btn-anadir-carrito">Añadir al carrito</a>
          `;

        // Agrega el contenido al juego destacado
        juegoDestacado.innerHTML = contenidoHTML;

        // Agrega el juego destacado al contenedor .product-grid
        productGrid.appendChild(juegoDestacado);
      }
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

  // Cargar los datos de ambos archivos JSON y combinar las listas
  function cargarYMostrarJuegosMesa() {
    const productosPromise = fetch("../JSON/productoJSON.json").then(
      (response) => response.json()
    );

    const accesoriosPromise = fetch("../JSON/accesorioJSON.json").then(
      (response) => response.json()
    );

    Promise.all([productosPromise, accesoriosPromise])
      .then(([productos, accesorios]) => {
        // Combina las listas de productos en una sola lista
        listaJuegosMesa = [...productos, ...accesorios];

        // Filtra la lista para mostrar solo los productos con descuento
        listaJuegosMesa = listaJuegosMesa.filter(
          (producto) => producto.descuento === true
        );

        ordenarJuegos("masVendidos"); // Ordena inicialmente por más vendidos
        actualizarVista();
        actualizarSelectorPagina();
      })
      .catch((error) => {
        console.error("Error al cargar la lista de productos: " + error);
      });
  }

  cargarYMostrarJuegosMesa();
});
