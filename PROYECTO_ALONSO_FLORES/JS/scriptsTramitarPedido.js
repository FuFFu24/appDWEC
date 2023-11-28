document.addEventListener("DOMContentLoaded", function () {
  // Array en el que vamos a guardar todos los datos del JSON
  let listaJuegosMesa = [];

  // Con esta funcion cargaremos los datos del JSON en la lista de juegos mesa y tambien mostraremos los datos en la pagina
  function cargarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;

      // Esto es solo para que al recargar la pagina se actualice el carrito y con ello su contador
      mostrarCarrito();
    });
  }

  cargarJuegosMesa();

  // Obtener datos del localStorage
  const datosUsuarioString = localStorage.getItem("datosUsuario");
  const datosUsuario = datosUsuarioString
    ? JSON.parse(datosUsuarioString)
    : null;

  const iconoUsuario = document.querySelector(".icono-usuario a");

  // Esto es para que cambie el href si estas logeado
  if (datosUsuario) {
    iconoUsuario.href = "../HTML/cuenta.html";
  }

  // Esto muestra un mensaje si no estas logeado, es decir, si no encuentra datosUsuario en el localStorage
  const noCuentaContainer = document.getElementById("no-cuenta-container");
  noCuentaContainer.style.display = "none";

  if (!datosUsuario) {
    noCuentaContainer.style.display = "flex";
  }

  const crearCuentaBtn = document.getElementById("crearCuentaBtn");

  if (crearCuentaBtn) {
    crearCuentaBtn.addEventListener("click", function () {
      noCuentaContainer.style.display = "none";
    });
  }

  // Esta parte es un poco de codigo comun para todas las paginas
  const searchInput = document.getElementById("input-buscar");

  // Función para mostrar los resultados de búsqueda en el desplegable
  function mostrarResultados(resultados) {
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
      resultadosDesplegable.innerHTML = '<div class="producto-grid"></div>';

      mostrarJuegosMesa(
        resultadosMostrar,
        ".resultados-busqueda .producto-grid"
      );

      resultadosDesplegable.style.display = "block";
    }
  }

  function mostrarJuegosMesa(productos, seccion) {
    const seccionMostrar = document.querySelector(`${seccion}`);

    productos.forEach((producto) => {
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

      seccionMostrar.appendChild(juegoDestacado);
    });
  }

  // Evento para buscar juegos de mesa en la lista desde un input con keyup
  searchInput.addEventListener("keyup", function () {
    const busqueda = searchInput.value.toLowerCase().trim();

    const resultados = listaJuegosMesa.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda)
    );
    mostrarResultados(resultados);
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

  // A partir de aqui tenemos unas cuantas lineas de codigo sobre el carrito de la compra
  function agregarAlCarrito(producto) {
    const carritoUsuario =
      JSON.parse(
        localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
      ) || [];

    const productoExistenteIndex = carritoUsuario.findIndex(
      (item) => item.id === producto.idProducto
    );

    if (productoExistenteIndex !== -1) {
      const carritoActualizado = [...carritoUsuario];
      carritoActualizado[productoExistenteIndex].cantidad++;
      localStorage.setItem(
        `carrito${datosUsuario.correoUsuario}`,
        JSON.stringify(carritoActualizado)
      );
    } else {
      const nuevoCarrito = [
        ...carritoUsuario,
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
      localStorage.setItem(
        `carrito${datosUsuario.correoUsuario}`,
        JSON.stringify(nuevoCarrito)
      );
    }

    mostrarCarrito();
    mostrarCarritoDetallado();
    mostrarResumenPedido(carritoUsuario);
  }

  function mostrarCarrito() {
    const carritoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`)) || [];
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

    if (carritoUsuario.length === 0) {
      carritoVacioMensaje.style.display = "block";
      cartItemsContainer.style.display = "none";
      subtotalContainer.style.display = "none";
      botonTramitarPedido.style.display = "none";
    } else {
      carritoUsuario.forEach((item) => {
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

      const subtotal = carritoUsuario.reduce((total, item) => {
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
    const totalProductos = carritoUsuario.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    contadorCarrito.textContent = totalProductos.toString();
  }

  function borrarDelCarrito(id) {
    const correoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? datosUsuario.correoUsuario
        : "";
    const carritoUsuario =
      JSON.parse(localStorage.getItem(`carrito${correoUsuario}`)) || [];

    const index = carritoUsuario.findIndex((item) => item.id === id);

    if (index !== -1) {
      carritoUsuario.splice(index, 1);

      localStorage.setItem(
        `carrito${correoUsuario}`,
        JSON.stringify(carritoUsuario)
      );

      mostrarCarrito();
      mostrarCarritoDetallado();
      mostrarResumenPedido(carritoUsuario);
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

  // Parte del resumen del pedido, tiene algun error como que si meto un codigo descuento y cambio el radio del tipo de envio se reinician los precios pero ya es mucho lio en mi cabeza
  const detalleCarritoBody = document.getElementById("detalle-carrito-body");
  const totalEnvioSpan = document.getElementById("total-envio");
  const totalFinalSpan = document.getElementById("total-final");
  const tramitarPedidoBtn = document.getElementById("tramitar-pedido");

  tramitarPedidoBtn.addEventListener("click", function () {
    // Verificar si hay un usuario logeado, si no encuentra datosUsuario muestra un mensaje
    if (!datosUsuario || !datosUsuario.correoUsuario) {
      const mensajeError = document.getElementById("error-tramitar");
      mensajeError.style.display = "flex";
      return;
    }

    // Mete en el localStorage informacion del pedido realizado
    const totalPedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const numeroPedido = totalPedidos.length + 1;

    const fechaActual = new Date();
    const fechaPedido = `${fechaActual.getDate()}/${
      fechaActual.getMonth() + 1
    }/${fechaActual.getFullYear()}`;

    const correoUsuario = datosUsuario.correoUsuario;

    const vecesCorreoAparece = totalPedidos.reduce(
      (count, pedido) =>
        pedido.correoUsuario === correoUsuario ? count + 1 : count,
      0
    );

    const mensaje =
      vecesCorreoAparece === 0 ? "primera_compra" : "compra_realizada";

    const totalPedido = parseFloat(totalFinalSpan.textContent);

    const carrito =
      JSON.parse(localStorage.getItem(`carrito${correoUsuario}`)) || [];
    const listaArticulos = carrito.map((item) => ({
      nombre: item.nombre,
      cantidad: item.cantidad,
      subtotal:
        (item.descuento
          ? item.precio * (1 - item.porcentajeDescuento / 100)
          : item.precio) * item.cantidad,
    }));

    const tipoEnvioSelect = document.querySelector(
      'input[name="tipo-envio"]:checked'
    );
    const tipoEnvio = tipoEnvioSelect ? tipoEnvioSelect.value : "tienda";

    const codigoInput = document.getElementById("codigo");
    const codigoIngresado = codigoInput.value.trim();

    const descuentoAplicado = aplicarDescuento(codigoIngresado);

    const totalPedidoConDescuento = descuentoAplicado
      ? totalPedido - totalPedido * (descuentoAplicado / 100)
      : totalPedido;

    const pedido = {
      numero: numeroPedido,
      fecha: fechaPedido,
      correoUsuario: correoUsuario,
      tipoEnvio: tipoEnvio,
      codigoUsado: codigoIngresado,
      total: totalPedidoConDescuento,
      articulos: listaArticulos,
    };

    totalPedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(totalPedidos));

    localStorage.removeItem(`carrito${correoUsuario}`);

    const codigosActual =
      JSON.parse(localStorage.getItem(`codigosDescuento${correoUsuario}`)) ||
      [];

    const codigosActualizado = codigosActual.filter((item) => {
      if (item.startsWith("APLICADO")) {
        return false;
      }
      return item !== codigoIngresado;
    });

    localStorage.setItem(
      `codigosDescuento${correoUsuario}`,
      JSON.stringify(codigosActualizado)
    );

    window.location.href = `index.html?mensaje=${mensaje}`;
  });

  function aplicarDescuento(codigo) {
    const correoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? datosUsuario.correoUsuario
        : "";

    const descuentos =
      JSON.parse(localStorage.getItem(`codigosDescuento${correoUsuario}`)) ||
      [];

    // Verificar si ya se aplicó un descuento
    const descuentoAplicadoIndex = descuentos.findIndex((desc) =>
      desc.startsWith("APLICADO")
    );

    if (descuentoAplicadoIndex !== -1) {
      descuentos.splice(descuentoAplicadoIndex, 1);
    }

    const nuevoDescuento = obtenerNuevoDescuento(codigo);

    if (nuevoDescuento !== 0) {
      descuentos.push(nuevoDescuento);
      localStorage.setItem(
        `codigosDescuento${datosUsuario.correoUsuario}`,
        JSON.stringify(descuentos)
      );

      let porcentajeDescuento = parseInt(nuevoDescuento.slice(-2), 10);

      return porcentajeDescuento;
    } else {
      return 0;
    }
  }

  // Función para obtener el porcentaje de descuento a partir del código
  function obtenerNuevoDescuento(codigo) {
    const porcentajeDescuento = parseInt(codigo.slice(-2), 10);
    return porcentajeDescuento > 0 ? `APLICADO${codigo}` : 0;
  }

  const usarCodigoBtn = document.getElementById("usar-codigo");

  usarCodigoBtn.addEventListener("click", function () {
    const correoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? datosUsuario.correoUsuario
        : "";

    const carrito = correoUsuario
      ? JSON.parse(localStorage.getItem(`carrito${correoUsuario}`)) || []
      : JSON.parse(localStorage.getItem(`carrito`)) || [];

    const codigoInput = document.getElementById("codigo");
    const codigoIngresado = codigoInput.value;

    const descuentoAplicado = aplicarDescuento(codigoIngresado);

    // Actualizar el total con el descuento
    const totalFinalSpan = document.getElementById("total-final");

    const subtotal = carrito.reduce(
      (total, item) =>
        total +
        (item.descuento
          ? item.precio * (1 - item.porcentajeDescuento / 100)
          : item.precio) *
          item.cantidad,
      0
    );

    const descuentoFinal = descuentoAplicado / 100;

    const totalConDescuento = subtotal - subtotal * descuentoFinal;
    totalFinalSpan.textContent = `${totalConDescuento.toFixed(2)} €`;
  });

  function mostrarCarritoDetallado() {
    const carrito =
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`)) || [];

    detalleCarritoBody.innerHTML = "";

    carrito.forEach((item) => {
      const fila = document.createElement("tr");

      const columnaImagenYNombre = document.createElement("td");
      const imagen = document.createElement("img");
      imagen.src = item.imagenURL;
      imagen.alt = item.nombre;
      imagen.classList.add("imagen-carrito");

      const nombreJuego = document.createElement("h3");
      nombreJuego.textContent = item.nombre;

      columnaImagenYNombre.appendChild(imagen);
      columnaImagenYNombre.appendChild(nombreJuego);

      const columnaPrecio = document.createElement("td");
      columnaPrecio.textContent = item.descuento
        ? (item.precio * (1 - item.porcentajeDescuento / 100)).toFixed(2) + " €"
        : item.precio.toFixed(2) + " €";

      const columnaCantidad = document.createElement("td");
      const inputCantidad = document.createElement("input");
      inputCantidad.type = "text";
      inputCantidad.value = item.cantidad;
      inputCantidad.addEventListener("keyup", function () {
        actualizarCantidad(item.id, parseInt(inputCantidad.value));
      });
      columnaCantidad.appendChild(inputCantidad);

      const columnaSubtotal = document.createElement("td");
      const subtotal =
        (item.descuento
          ? item.precio * (1 - item.porcentajeDescuento / 100)
          : item.precio) * item.cantidad;
      columnaSubtotal.textContent = subtotal.toFixed(2) + " €";

      const columnaQuitar = document.createElement("td");
      const imagenQuitar = document.createElement("img");
      imagenQuitar.src = "../IMG/LOGOS/basura-gris.png";
      imagenQuitar.alt = "Quitar artículo";
      imagenQuitar.classList.add("imagen-quitar");
      imagenQuitar.addEventListener("click", function () {
        quitarDelCarrito(item.id);
      });
      columnaQuitar.appendChild(imagenQuitar);

      fila.appendChild(columnaImagenYNombre);
      fila.appendChild(columnaPrecio);
      fila.appendChild(columnaCantidad);
      fila.appendChild(columnaSubtotal);
      fila.appendChild(columnaQuitar);

      detalleCarritoBody.appendChild(fila);
    });

    mostrarResumenPedido(carrito);
  }

  const tipoEnvioRadios = document.querySelectorAll('input[name="tipo-envio"]');

  tipoEnvioRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const correoUsuario =
        datosUsuario && datosUsuario.correoUsuario
          ? datosUsuario.correoUsuario
          : "";

      const carrito = correoUsuario
        ? JSON.parse(localStorage.getItem(`carrito${correoUsuario}`)) || []
        : JSON.parse(localStorage.getItem(`carrito`)) || [];
      mostrarResumenPedido(carrito);
    });
  });

  function mostrarResumenPedido(carrito) {
    const subtotal = carrito.reduce(
      (total, item) =>
        total +
        (item.descuento
          ? item.precio * (1 - item.porcentajeDescuento / 100)
          : item.precio) *
          item.cantidad,
      0
    );

    const tipoEnvioSelect = document.querySelector(
      'input[name="tipo-envio"]:checked'
    );
    const tipoEnvio = tipoEnvioSelect ? tipoEnvioSelect.value : "tienda";

    const totalEnvio = tipoEnvio === "casa" ? 3.9 : 0;

    totalEnvioSpan.textContent = `${totalEnvio.toFixed(2)} €`;

    const totalFinal = subtotal + totalEnvio;
    totalFinalSpan.textContent = `${totalFinal.toFixed(2)} €`;
  }

  function actualizarCantidad(id, nuevaCantidad) {
    const correoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? datosUsuario.correoUsuario
        : "";

    if (correoUsuario) {
      const carrito =
        JSON.parse(localStorage.getItem(`carrito${correoUsuario}`)) || [];

      const index = carrito.findIndex((item) => item.id === id);

      if (index !== -1) {
        carrito[index].cantidad = nuevaCantidad;
        localStorage.setItem(
          `carrito${correoUsuario}`,
          JSON.stringify(carrito)
        );
        mostrarCarritoDetallado();
        mostrarCarrito();
      }
    }
    pulsardescuento();
  }

  function quitarDelCarrito(id) {
    const correoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? datosUsuario.correoUsuario
        : "";

    if (correoUsuario) {
      const carrito =
        JSON.parse(localStorage.getItem(`carrito${correoUsuario}`)) || [];

      const index = carrito.findIndex((item) => item.id === id);

      if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem(
          `carrito${datosUsuario.correoUsuario}`,
          JSON.stringify(carrito)
        );
        mostrarCarritoDetallado();
        mostrarCarrito();
      }
    }
  }

  mostrarCarritoDetallado();

  // Esta parte esta dedicada para el newsletter, te proporciona un codigo descuento si introduces los datos correctos
  const newsletterContainer = document.getElementById("newsletterContainer");
  newsletterContainer.style.display = "none";
  const checkboxPolitica = document.getElementById("acepto");
  const btnSuscribirse = document.querySelector(".suscribirse");
  const graciasMensajeNewsletter = document.getElementById(
    "graciasMensajeNewsletter"
  );

  const errorCorreo = document.getElementById("error-correo");
  const errorPolitica = document.getElementById("error-politica");

  btnSuscribirse.addEventListener("click", function () {
    errorCorreo.style.display = "none";
    errorPolitica.style.display = "none";
    let valorInputCorreo = document.getElementById("email").value;
    if (
      valorInputCorreo != "" &&
      datosUsuario &&
      datosUsuario.correoUsuario == valorInputCorreo
    ) {
      if (checkboxPolitica.checked) {
        const codigosDescuento =
          JSON.parse(
            localStorage.getItem(
              `codigosDescuento${datosUsuario.correoUsuario}`
            )
          ) || [];

        if (!codigosDescuento.includes("NEWSLETTER20")) {
          codigosDescuento.push("NEWSLETTER20");

          localStorage.setItem(
            `codigosDescuento${datosUsuario.correoUsuario}`,
            JSON.stringify(codigosDescuento)
          );
        }

        graciasMensajeNewsletter.textContent = `¡Felicidades, ${datosUsuario.nombreUsuario}! 🎉`;
        newsletterContainer.style.display = "flex";
      } else {
        errorPolitica.style.display = "block";
      }
    } else {
      errorCorreo.style.display = "block";
    }
  });

  const aceptarBtnNewsletter = document.getElementById("aceptarBtnNewsletter");

  if (aceptarBtnNewsletter) {
    aceptarBtnNewsletter.addEventListener("click", function () {
      newsletterContainer.style.display = "none";
    });
  }

  $("#recogerEnTienda").click(function () {
    setTimeout(pulsardescuento, 1000);
  });

  $("#envioACasa").click(function () {
    setTimeout(pulsardescuento, 1000);
  });

  function pulsardescuento() {
    $("#usar-codigo").trigger("click");
  }
});
