document.addEventListener("DOMContentLoaded", function () {
  // Array en el que vamos a guardar todos los datos del JSON
  let listaJuegosMesa = [];
  let resultados = [];

  // Recupera la consulta de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  // Con esta funcion cargaremos los datos del JSON en la lista de juegos mesa y tambien mostraremos los datos en la pagina
  function cargarYMostrarJuegosMesa() {
    if (query) {
      $.getJSON("../JSON/productoJSON.json", function (datos) {
        listaJuegosMesa = datos;

        // Filtra los resultados basados en la consulta
        resultados = buscarProductos(query, listaJuegosMesa);

        if (resultados.length > 0) {
          ordenarJuegos("masVendidos");
          actualizarVista(resultados);
          actualizarSelectorPagina(resultados);
        } else {
          const resultadosDiv = document.querySelector(".resultados-busqueda");
          resultadosDiv.innerHTML =
            '<p class="sin-resultados">No se encontraron resultados.</p>';
        }

        mostrarCarrito();
      });
    }
  }

  cargarYMostrarJuegosMesa();

  var juegosPorPagina = 12;
  var paginaActual = 1;

  const selectOrdenar = document.getElementById("filtrar-ordenar");
  const productosPorPage = document.getElementById("productosPorPage");
  const searchInput = document.getElementById("input-buscar");

  function buscarProductos(consulta, listaProductos) {
    consulta = consulta.toLowerCase();
    return listaProductos.filter((producto) =>
      producto.nombre.toLowerCase().includes(consulta)
    );
  }

  function mostrarJuegosMesa(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = `<div class="product-grid"></div>`;
    const productGrid = document.querySelector(".product-grid");

    mostrarCadaJuegoMesaEstructuraGeneral(lista, productGrid);
  }

  // Función para mostrar los resultados de búsqueda en el desplegable
  function mostrarResultadosBusquedaEnDesplegable(resultados) {
    const resultadosDesplegable = document.querySelector(
      ".resultados-busqueda"
    );

    resultadosDesplegable.innerHTML = "";

    const resultadosMostrar = resultados.slice(0, 5);

    if (resultadosMostrar.length === 0) {
      const mensaje = document.createElement("p");
      mensaje.classList.add("sin-resultados");
      mensaje.innerHTML = `😔 No hemos encontrado nada para <strong>"${searchInput.value}"</strong>`;
      resultadosDesplegable.appendChild(mensaje);
    } else if (!searchInput.value.trim()) {
      resultadosDesplegable.style.display = "none";
    } else {
      resultadosDesplegable.innerHTML =
        '<div class="product-grid-desplegable"></div>';
      const productGrid = resultadosDesplegable.querySelector(
        ".product-grid-desplegable"
      );

      mostrarCadaJuegoMesaEstructuraGeneral(resultadosMostrar, productGrid);

      resultadosDesplegable.style.display = "block";
    }
  }

  // Esta funcion la creo ya que tiene codigo en comun entre la busqueda y los prodcutos mostrados en la pagina
  function mostrarCadaJuegoMesaEstructuraGeneral(lista, dondeMostrar) {
    lista.forEach((producto) => {
      const juegoDestacado = document.createElement("div");
      juegoDestacado.classList.add("juego-destacado");

      const imagen = document.createElement("img");
      imagen.src = producto.imagenURL;
      imagen.alt = producto.nombre;

      const datosJuego = document.createElement("div");
      datosJuego.classList.add("datos-juego");

      const nombre = document.createElement("h3");
      nombre.textContent = producto.nombre;

      const descripcion = document.createElement("p");
      descripcion.classList.add("descripcion-hover");
      descripcion.textContent = producto.descripcion;

      const precio = document.createElement("p");

      if (producto.descuento) {
        const precioConDescuento =
          producto.precio * (1 - producto.porcentajeDescuento / 100);
        precio.innerHTML = `<strong>${precioConDescuento.toFixed(
          2
        )} €</strong> <span class="precio-original">Antes ${producto.precio.toFixed(
          2
        )} €</span>`;
      } else {
        precio.innerHTML = `<strong>${producto.precio.toFixed(2)} €</strong>`;
      }

      const btnAnadirCarrito = document.createElement("button");
      btnAnadirCarrito.textContent = "Añadir al carrito";
      btnAnadirCarrito.classList.add("btn-anadir-carrito");
      btnAnadirCarrito.addEventListener("click", () =>
        agregarAlCarrito(producto)
      );

      datosJuego.appendChild(nombre);
      datosJuego.appendChild(descripcion);
      datosJuego.appendChild(precio);
      datosJuego.appendChild(btnAnadirCarrito);

      juegoDestacado.appendChild(imagen);
      juegoDestacado.appendChild(datosJuego);
      juegoDestacado.appendChild(btnAnadirCarrito);

      dondeMostrar.appendChild(juegoDestacado);
    });
  }

  // Evento para buscar juegos de mesa en la lista desde un input con keyup
  searchInput.addEventListener("keyup", function () {
    const busqueda = searchInput.value.toLowerCase().trim();

    const resultados = listaJuegosMesa.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda)
    );
    mostrarResultadosBusquedaEnDesplegable(resultados);
  });

  // Evento para ocultar el desplegable de la busqueda cuando se pulsa fuera
  document.addEventListener("click", function (event) {
    const esClickeado = event.target.closest(".resultados-busqueda");

    if (!esClickeado) {
      const resultadosDesplegable = document.querySelector(
        ".resultados-busqueda"
      );
      resultadosDesplegable.style.display = "none";
    }
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
  }

  function actualizarVista(lista) {
    mostrarJuegosMesa(
      lista.slice(
        (paginaActual - 1) * juegosPorPagina,
        paginaActual * juegosPorPagina
      )
    );
  }

  selectOrdenar.addEventListener("change", function () {
    const opcionSeleccionada = selectOrdenar.value;
    ordenarJuegos(opcionSeleccionada);
    paginaActual = 1;
    actualizarVista(resultados);
    actualizarSelectorPagina();
  });

  productosPorPage.addEventListener("change", function () {
    juegosPorPagina = parseInt(this.value);
    paginaActual = 1;
    actualizarVista(resultados);
    actualizarSelectorPagina();
  });

  function actualizarSelectorPagina() {
    const selectorPagina = document.querySelector(".page-selector ul");
    selectorPagina.innerHTML = "";

    const numPaginas = Math.ceil(resultados.length / juegosPorPagina);
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
        actualizarVista(resultados);
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
        actualizarVista(resultados);
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
        actualizarVista(resultados);
        actualizarSelectorPagina();
      });
      selectorPagina.appendChild(botonPaginaSiguiente);
    }
  }

  // A partir de aqui tenemos unas cuantas lineas de codigo sobre el carrito de la compra
  function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistenteIndex = carrito.findIndex(
      (item) => item.id === producto.idProducto
    );

    if (productoExistenteIndex !== -1) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      const carritoActualizado = [...carrito];
      carritoActualizado[productoExistenteIndex].cantidad++;
      localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    } else {
      const nuevoCarrito = [
        ...carrito,
        {
          id: producto.idProducto,
          nombre: producto.nombre,
          imagenURL: producto.imagenURL,
          precio: producto.precio,
          cantidad: 1,
          descuento: producto.descuento,
          porcentajeDescuento: producto.porcentajeDescuento || 0,
        },
      ];
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }

    mostrarCarrito();
  }

  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contadorCarrito = document.querySelector(".contador-carrito");
    const carritoVacioMensaje = document.getElementById("carrito-vacio");
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const botonTramitarPedido = document.querySelector(".boton-tramitar");

    carritoVacioMensaje.style.display = "none";
    cartItemsContainer.style.display = "block";
    subtotalContainer.style.display = "block";
    botonTramitarPedido.style.display = "block";

    cartItemsContainer.innerHTML = "";

    if (carrito.length === 0) {
      carritoVacioMensaje.style.display = "block";
      cartItemsContainer.style.display = "none";
      subtotalContainer.style.display = "none";
      botonTramitarPedido.style.display = "none";
    } else {
      carrito.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const imagen = document.createElement("img");
        imagen.src = item.imagenURL || "";
        imagen.alt = item.nombre;
        imagen.className = "imagen-carrito";

        const detalles = document.createElement("div");
        detalles.classList.add("cart-item-details");

        const nombre = document.createElement("h4");
        nombre.textContent = item.nombre;

        const precio = document.createElement("p");
        if (item.precio && item.descuento) {
          const precioConDescuento =
            item.precio * (1 - item.porcentajeDescuento / 100);
          precio.textContent = `${precioConDescuento.toFixed(2)} € (Descuento ${
            item.porcentajeDescuento
          }%)`;
        } else if (item.precio) {
          precio.textContent = `${item.precio.toFixed(2)} €`;
        } else {
          precio.textContent = "Precio no disponible";
        }

        const cantidad = document.createElement("p");
        cantidad.textContent = `Cantidad: ${item.cantidad}`;

        // Aqui he querido crear y modificar el hover del boton para eliminar los productos por ver como se haria en JavaScript
        const botonBorrar = document.createElement("img");
        botonBorrar.src = "../IMG/LOGOS/basura-gris.png";
        botonBorrar.alt = "Borrar";
        botonBorrar.classList.add("boton-borrar");
        botonBorrar.addEventListener("click", () => borrarDelCarrito(item.id));

        botonBorrar.addEventListener("mouseover", () => {
          botonBorrar.src = "../IMG/LOGOS/basura-verde.png";
        });

        botonBorrar.addEventListener("mouseout", () => {
          botonBorrar.src = "../IMG/LOGOS/basura-gris.png";
        });

        detalles.appendChild(nombre);
        detalles.appendChild(precio);
        detalles.appendChild(cantidad);
        detalles.appendChild(botonBorrar);

        cartItem.appendChild(imagen);
        cartItem.appendChild(detalles);

        cartItemsContainer.appendChild(cartItem);
      });

      const subtotal = carrito.reduce((total, item) => {
        const precioUnitario = item.descuento
          ? item.precio * (1 - item.porcentajeDescuento / 100)
          : item.precio;

        return total + (precioUnitario || 0) * item.cantidad;
      }, 0);

      subtotalContainer.innerHTML = `<p>Subtotal: <strong>${subtotal.toFixed(
        2
      )} €</strong></p>`;
    }

    // Esta parte es la que va a actualizar el contador del carrito cada vez que se introduzca un nuevo juego
    const totalProductos = carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    contadorCarrito.textContent = totalProductos.toString();
  }

  function borrarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex((item) => item.id === id);

    if (index !== -1) {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      mostrarCarrito();
    }
  }

  // Evento que escucha si hago click en la imagen del carrito y lanza la funcion
  document
    .querySelector('img[alt="Carrito de compras"]')
    .addEventListener("click", () => {
      mostrarCarrito();
      mostrarOcultarDesplegableCarrito();
    });

  // Función para mostrar u ocultar el desplegable del carrito
  function mostrarOcultarDesplegableCarrito() {
    const contenidoCarrito = document.querySelector(".contenido-carrito");
    contenidoCarrito.style.display =
      contenidoCarrito.style.display === "block" ? "none" : "block";
  }

  // Evento al hacer clic fuera del desplegable del carrito
  document.addEventListener("click", function (event) {
    const esClickeadoIconoCarrito = event.target.closest(".icono-carrito");
    const esClickeadoContenidoCarrito =
      event.target.closest(".contenido-carrito");

    if (!esClickeadoIconoCarrito && !esClickeadoContenidoCarrito) {
      const contenidoCarrito = document.querySelector(".contenido-carrito");
      contenidoCarrito.style.display = "none";
    }
  });
});
