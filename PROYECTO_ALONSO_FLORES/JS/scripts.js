let listaClientes = [];

  function cargarDatosClientes() {
    $.getJSON("../JSON/clienteJSON.json", function (datos) {
      listaClientes = datos;

      procesarDatosURL();
    });
  }

  cargarDatosClientes();

  function procesarDatosURL() {
    // Obtén los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const correo = urlParams.get("correo");

    // Busca el usuario en la lista de clientes por correo
    const usuario = listaClientes.find((user) => user.correo === correo);

    if (usuario) {
      const datosUsuario = {
        idUsuario: usuario.id,
        nombreUsuario: usuario.nombre,
        apellidoUsuario: usuario.apellidos,
        direccionUsuario: usuario.direccion,
        correoUsuario: usuario.correo,
        telefonoUsuario: usuario.telefono,
      };

      localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
    }
    pintarPagina();

  }

function pintarPagina(){
  // Array en el que vamos a guardar todos los datos del JSON
  let listaJuegosMesa = [];

  // Con esta funcion cargaremos los datos del JSON en la lista de juegos mesa y tambien mostraremos los datos en la pagina
  function cargarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;

      mostrarJuegosMesa(getMejorValorados(), ".mejor-valorados");
      mostrarJuegosMesa(getNovedades(), ".novedades");
      mostrarJuegosMesa(getEnOferta(), ".en-oferta");

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

  const mensajeContainer = document.getElementById("mensajeContainer");
  const bienvenidaMensaje = document.getElementById("bienvenidaMensaje");
  const iconoUsuario = document.querySelector(".icono-usuario a");

  // Si no hay datosUsuario, es decir, si no estas logeado no te muestra el mensaje del carrito
  if (datosUsuario) {
    // Si hay un usuario logueado, mostrar mensaje de bienvenida
    bienvenidaMensaje.textContent = `Hola, ${datosUsuario.nombreUsuario}!`;

    // Verificar si hay elementos en el carrito
    const carritoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`));
    if (carritoUsuario.length > 0) {
      mensajeContainer.style.display = "flex";
    } else {
      mensajeContainer.style.display = "none";
    }

    // Si entra aqui quiere decir que hay alguien logeado asique cambia el href del icono de asuario pra que ahora reenvia a las opciones de cuenta
    iconoUsuario.href = "../HTML/cuenta.html";

    // Un timer para cerrar la pestaña y no sea incomo y tambien por poner un poco de todo
    setTimeout(function () {
      mensajeContainer.style.display = "none";
    }, 10000);
  } else {
    mensajeContainer.style.display = "none";
  }

  const graciasBtn = document.getElementById("graciasBtn");
  const verCarritoBtn = document.getElementById("verCarritoBtn");

  graciasBtn.addEventListener("click", function () {
    mensajeContainer.style.display = "none";
  });

  // Te reenvia a la pagina de tramitar pedidio para que finalices la compra o recuerdes lo que metiste
  verCarritoBtn.addEventListener("click", function () {
    window.location.href = `tramitarPedido.html`;
    mensajeContainer.style.display = "none";
  });

  // Recoge los datos enviados en la URL
  const parametrosURL = new URLSearchParams(window.location.search);
  const siMensaje = parametrosURL.get("mensaje") ?? "";

  const primeraCompraContainer = document.getElementById(
    "primeraCompraContainer"
  );
  const exitoCompraContainer = document.getElementById("exitoCompraContainer");
  const felicidadesMensaje = document.getElementById("felicidadesMensaje");
  const graciasMensaje = document.getElementById("graciasMensaje");

  // Si no hay datosUsuario, es decir, si no estas logeado no te da el codigo
  if (datosUsuario) {
    if (siMensaje === "primera_compra") {
      const codigosDescuento =
        JSON.parse(
          localStorage.getItem(`codigosDescuento${datosUsuario.correoUsuario}`)
        ) || [];

      if (!codigosDescuento.includes("PRIMERACOMPRA15")) {
        codigosDescuento.push("PRIMERACOMPRA15");

        localStorage.setItem(
          `codigosDescuento${datosUsuario.correoUsuario}`,
          JSON.stringify(codigosDescuento)
        );
      }

      felicidadesMensaje.textContent = `¡Felicidades, ${datosUsuario.nombreUsuario}! 🎉`;
      exitoCompraContainer.style.display = "none";
    } else if (siMensaje === "compra_realizada") {
      graciasMensaje.textContent = `¡Gracias, ${datosUsuario.nombreUsuario}! 😊`;
      primeraCompraContainer.style.display = "none";
    } else {
      primeraCompraContainer.style.display = "none";
      exitoCompraContainer.style.display = "none";
    }
  } else {
    primeraCompraContainer.style.display = "none";
    exitoCompraContainer.style.display = "none";
  }

  const aceptarBtnFelicidades = document.getElementById(
    "aceptarBtnFelicidades"
  );
  const aceptarBtnExito = document.getElementById("aceptarBtnExito");

  if (aceptarBtnFelicidades) {
    aceptarBtnFelicidades.addEventListener("click", function () {
      primeraCompraContainer.style.display = "none";
    });
  }

  if (aceptarBtnFelicidades) {
    aceptarBtnExito.addEventListener("click", function () {
      exitoCompraContainer.style.display = "none";
    });
  }

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

  // Tres funciones para ordenar la lista segun las tres secciones que hay en el codigo main
  function getMejorValorados() {
    return listaJuegosMesa
      .filter((producto) => producto.nota)
      .sort((a, b) => b.nota - a.nota)
      .slice(0, 5);
  }

  function getNovedades() {
    return listaJuegosMesa
      .filter((producto) => producto.fecha)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 5);
  }

  function getEnOferta() {
    return listaJuegosMesa
      .filter((producto) => producto.descuento)
      .sort((a, b) => b.porcentajeDescuento - a.porcentajeDescuento)
      .slice(0, 5);
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
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`));

    const productoExistenteIndex = carritoUsuario.findIndex(
      (item) => item.id === producto.idProducto
    );

    if (productoExistenteIndex !== -1) {
      const carritoActualizado = [...carritoUsuario];
      carritoActualizado[productoExistenteIndex].cantidad++;
      localStorage.setItem(
        `carrito${
          datosUsuario && datosUsuario.correoUsuario
            ? datosUsuario.correoUsuario
            : ""
        }`,
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
        `carrito${
          datosUsuario && datosUsuario.correoUsuario
            ? datosUsuario.correoUsuario
            : ""
        }`,
        JSON.stringify(nuevoCarrito)
      );
    }

    mostrarCarrito();
  }

  function mostrarCarrito() {
    const carritoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`));
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
    const carritoUsuario =
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`));

    const index = carritoUsuario.findIndex((item) => item.id === id);

    if (index !== -1) {
      if (carritoUsuario[index].cantidad > 1) {
        carritoUsuario[index].cantidad--;
      } else {
        carritoUsuario.splice(index, 1);
      }

      localStorage.setItem(
        `carrito${
          datosUsuario && datosUsuario.correoUsuario
            ? datosUsuario.correoUsuario
            : ""
        }`,
        JSON.stringify(carritoUsuario)
      );

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
}
