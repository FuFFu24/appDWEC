document.addEventListener("DOMContentLoaded", function () {
  var listaJuegosMesa = [];
  var listaAccesorios = [];

  // Función para cargar los datos de juegos de mesa y accesorios
  function cargarJuegosMesa() {
    // Cargar datos de juegos de mesa desde productoJSON.json
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;
      // Ordenar y mostrar productos de juegos de mesa
      ordenarPorDescuento(listaJuegosMesa);
      mostrarJuegosMesa(listaJuegosMesa);
      ordenarPorFecha(listaJuegosMesa);
      mostrarJuegosMesa(listaJuegosMesa);
      ordenarPorNota(listaJuegosMesa);
      mostrarJuegosMesa(listaJuegosMesa);
    });

    // Cargar datos de accesorios desde accesorioJSON.json
    $.getJSON("../JSON/accesorioJSON.json", function (datos) {
      listaAccesorios = datos;
    });
  }

  cargarJuegosMesa();

  // Obtener el campo de búsqueda por su selector
  const busquedaInput = document.querySelector("input[type='text']");

  // Función para buscar productos en ambas listas
  function buscarProductos(termino) {
    const resultadosJuegosMesa = buscarEnLista(termino, listaJuegosMesa);
    const resultadosAccesorios = buscarEnLista(termino, listaAccesorios);

    // Combinar los resultados de ambas listas
    const resultadosCombinados =
      resultadosJuegosMesa.concat(resultadosAccesorios);

    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda"
    );
    resultadosDesplegable.innerHTML = `
      <p class="sin-resultados"></p>
      <div class="product-grid"></div>`;

    return resultadosCombinados.slice(0, 5); // Limitar a mostrar un máximo de 5 resultados.
  }

  // Función para buscar en una lista
  function buscarEnLista(termino, lista) {
    return lista.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );
  }

  // Función para mostrar los juegos de mesa
  function mostrarJuegosMesa(lista) {
    const mensaje = document.querySelector(".sin-resultados");
    const productGrid = document.querySelector(".product-grid");

    // Limpiar el contenido actual
    productGrid.innerHTML = "";

    if (lista.length === 0) {
      // Si la lista está vacía, mostrar un mensaje
      mensaje.innerHTML = `😔 No hemos encontrado nada para <strong>"${busquedaInput.value}"</strong>`;
    } else {
      lista.forEach((producto, index) => {
        if (index >= 5) {
          return; // Sal del bucle si se han procesado 5 elementos
        }

        // Crea un nuevo juego destacado
        const juegoDestacado = document.createElement("div");
        juegoDestacado.className = "juego-destacado";

        if (producto.descuento) {
          // Calcula el precio con descuento
          valorDescuento =
            (producto.precio * producto.porcentajeDescuento) / 100;
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
  }

  // Escuchar el evento "input" en el campo de búsqueda
  busquedaInput.addEventListener("input", function () {
    const terminoBusqueda = busquedaInput.value;

    // Realiza la búsqueda y muestra los resultados
    const resultados = buscarProductos(terminoBusqueda);
    mostrarJuegosMesa(resultados);
  });

  // Escuchar el evento "blur" para ocultar el desplegable cuando el campo pierde el foco
  busquedaInput.addEventListener("blur", function () {
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda"
    );
    resultadosDesplegable.innerHTML = ""; // Elimina el contenido del desplegable
  });

  // Escuchar el evento "keyup" para redirigir a la página de resultados
  busquedaInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const query = busquedaInput.value;
      if (query.trim() !== "") {
        // Redirigir a la página de resultados con la consulta en los parámetros de la URL
        window.location.href = `resultados.html?query=${encodeURIComponent(
          query
        )}`;
      }
    }
  });

  // Función para ordenar la lista por la propiedad "nota"
  function ordenarPorNota(lista) {
    lista.sort((a, b) => {
      const notaA = parseFloat(a.nota);
      const notaB = parseFloat(b.nota);
      return notaB - notaA; // Ordena de mayor a menor nota
    });

    const destacados = document.querySelector(".mejor-valorados");
    destacados.innerHTML =
      '<h2>Juegos mejor valorados</h2><div class="product-grid"></div>';
  }

  // Función para ordenar la lista por la propiedad "fecha"
  function ordenarPorFecha(lista) {
    lista.sort((a, b) => {
      const fechaA = new Date(b.fecha);
      const fechaB = new Date(a.fecha);
      return fechaA - fechaB;
    });

    const destacados = document.querySelector(".novedades");
    destacados.innerHTML =
      '<h2>Destacados</h2><div class="product-grid"></div>';
  }

  // Función para ordenar la lista por la propiedad "descuento"
  function ordenarPorDescuento(lista) {
    lista.sort((a, b) => {
      // Compara el atributo "descuento"
      if (a.descuento && !b.descuento) {
        return -1; // a viene primero (tiene descuento)
      } else if (!a.descuento && b.descuento) {
        return 1; // b viene primero (tiene descuento)
      } else {
        // Si tienen el mismo estado de "descuento", compara "porcentajeDescuento"
        return b.porcentajeDescuento - a.porcentajeDescuento;
      }
    });

    const destacados = document.querySelector(".en-oferta");
    destacados.innerHTML =
      '<h2>Juegos en oferta</h2><div class="product-grid"></div>';
  }
});
