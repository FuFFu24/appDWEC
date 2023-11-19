document.addEventListener("DOMContentLoaded", function () {
  // Array en el que vamos a guardar todos los datos del JSON
  let listaClientes = [];
  let listaJuegosMesa = [];

  function cargarDatosClientes() {
    $.getJSON("../JSON/clienteJSON.json", function (datos) {
      listaClientes = datos;
      mostrarDatosUsuario();

      cargarDatosUsuarioInput();
    });
  }

  cargarDatosClientes();

  function cargarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;
      mostrarCarrito();
    });
  }

  cargarJuegosMesa();

  // Recogida de datos del localStorage comun para muchas funciones
  const datosUsuarioString = localStorage.getItem("datosUsuario");
  const datosUsuario = datosUsuarioString
    ? JSON.parse(datosUsuarioString)
    : null;

  // Con esto ponemos los datos que tiene el cliente guardos directamente
  function cargarDatosUsuarioInput() {
    if (datosUsuario) {
      document.getElementById("nombre").value =
        datosUsuario.nombreUsuario || "";
      document.getElementById("apellidos").value =
        datosUsuario.apellidoUsuario || "";
      document.getElementById("direccion").value =
        datosUsuario.direccionUsuario || "";
      document.getElementById("correoAntiguo").value =
        datosUsuario.correoUsuario || "";
      document.getElementById("telefono").value =
        datosUsuario.telefonoUsuario || "";
      document.getElementById("correo").value =
        datosUsuario.correoUsuario || "";
    }
  }

  function mostrarDatosUsuario() {
    const datosUsuarioDiv = document.getElementById("datos-usuario");
    const iconoUsuario = document.querySelector(".icono-usuario a");

    if (datosUsuario) {
      const correoUsuario = datosUsuario.correoUsuario;

      const usuarioEnLista = listaClientes.find(
        (user) => user.correo === correoUsuario
      );

      if (usuarioEnLista) {
        Object.keys(usuarioEnLista).forEach((key) => {
          if (key !== "contrasena" && key !== "idCliente") {
            const nuevoDato = document.createElement("p");
            nuevoDato.innerHTML = `${usuarioEnLista[key]}`;
            datosUsuarioDiv.appendChild(nuevoDato);
          }
        });

        iconoUsuario.href = "../HTML/cuenta.html";
      }
    } else {
      const seccionCuenta = document.querySelector(".cuenta-section");
      seccionCuenta.innerHTML = "";
      const noTienesCuenta = document.createElement("p");
      noTienesCuenta.textContent = "Todavia no tienes cuenta";
      const noEresMonstrusocio = document.createElement("h3");
      noEresMonstrusocio.textContent = "¿Aun no eres Monstrusocio?";
      const textoVentajas = document.createElement("p");
      textoVentajas.innerHTML = `
        <p>→ Teniendo una cuenta de Monstrusocio te enterarás antes que nadie de las novedades semanales, promociones exclusivas, invitaciones a eventos, regalos y sorteos.</p>

        <p>→ Podrás disfrutar de un descuento en nuestras tiendas físicas de juegos de multitud de editoriales. Pregunta en la tienda los juegos con promociones disponibles.</p>
        
        <p>→ Acumularás Fichas cada vez que compres en Monstruo de los Juegos. Las Fichas te permiten obtener descuentos en tus siguientes compras.</p>
        
        <p>→ Tendrás acceso a tu Panel de Cliente y podrás almacenar las compras que has hecho, descargar facturas, guardar tus direcciones, tramitar devoluciones y podrás tener tu Lista de deseos de los productos que quieres guardar para ver en otro momento.</p>
        
        <p>→ También, dentro del Panel y, si haces una compra en la web, te aparecerá en tu Panel de cliente un código personal en la sección “Invitaciones”. Tus amigos tendrán descuento y tú podrás ganar Fichas con sus compras.</p>
      `;
      const enlaceCrearCuenta = document.createElement("a");
      enlaceCrearCuenta.href = "../HTML/login.html";
      const botonCrearCuenta = document.createElement("button");
      botonCrearCuenta.className = "boton-crear-cuenta";
      botonCrearCuenta.textContent = "Crear una cuenta";

      seccionCuenta.appendChild(noTienesCuenta);
      seccionCuenta.appendChild(noEresMonstrusocio);
      seccionCuenta.appendChild(textoVentajas);
      enlaceCrearCuenta.appendChild(botonCrearCuenta);
      seccionCuenta.appendChild(enlaceCrearCuenta);
    }
  }

  // COn esto mostramos los formularios para modificar los datos
  const linkEditarDatos = document.getElementById("editarNombre");
  const linkEditarContrasena = document.getElementById("cambiarContrasena");
  const seccionEditarDatos = document.querySelector(".editar-cuenta");
  const seccionEditarContrasena = document.querySelector(".editar-contrasena");

  linkEditarDatos.addEventListener("click", function () {
    seccionEditarDatos.style.display =
      seccionEditarDatos.style.display === "block" ? "none" : "block";
  });

  linkEditarContrasena.addEventListener("click", function () {
    seccionEditarContrasena.style.display =
      seccionEditarContrasena.style.display === "block" ? "none" : "block";
  });

  // Recoger datos de la URL, donde se envian los errores producidos
  const parametrosURL = new URLSearchParams(window.location.search);
  const exito = parametrosURL.get("exito");
  const error = parametrosURL.get("error");

  // Verifica si hay un error
  const datosModificados = document.getElementById("datos-modificados");
  const noEncontradoDatos = document.getElementById(
    "cliente-no-encontrado-datos"
  );
  const noCoincideDatos = document.getElementById("correo-no-coincide-datos");
  const noEncontradoContrasena = document.getElementById(
    "cliente-no-encontrado-contrasena"
  );
  const noCoincideContrasena = document.getElementById(
    "correo-no-coincide-contrasena"
  );
  const contrasenaIncorrecta = document.getElementById("contrasena-incorrecta");

  if (exito === "datos_modificados") {
    datosModificados.style.display = "block";
  } else {
    datosModificados.style.display = "none";
  }
  if (error === "cliente_no_encontrado_datos") {
    noEncontradoDatos.style.display = "block";
  } else {
    noEncontradoDatos.style.display = "none";
  }
  if (error === "correo_no_coincide_datos") {
    noCoincideDatos.style.display = "block";
  } else {
    noCoincideDatos.style.display = "none";
  }
  if (error === "cliente_no_encontrado_contrasena") {
    noEncontradoContrasena.style.display = "block";
  } else {
    noEncontradoContrasena.style.display = "none";
  }
  if (error === "correo_no_coincide_contrasena") {
    noCoincideContrasena.style.display = "block";
  } else {
    noCoincideContrasena.style.display = "none";
  }
  if (error === "contrasena_incorrecta") {
    contrasenaIncorrecta.style.display = "block";
  } else {
    contrasenaIncorrecta.style.display = "none";
  }

  // Aqui creamos una tabla para mostrar todos los pedidos realizados por el cliente
  const totalPedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const tablaPedidosBody = document.getElementById("tablaPedidosBody");
  const seccionPedidosRecientes = document.querySelector(".pedidos-recientes");

  let seEncontroPedido = false;

  totalPedidos.forEach((pedido) => {
    if (datosUsuario && pedido.correoUsuario === datosUsuario.correoUsuario) {
      seEncontroPedido = true;
      const fila = document.createElement("tr");

      const columnaNumeroPedido = document.createElement("td");
      columnaNumeroPedido.textContent = pedido.numero;

      const columnaFechaPedido = document.createElement("td");
      columnaFechaPedido.textContent = pedido.fecha;

      const columnaTipoEnvio = document.createElement("td");
      columnaTipoEnvio.textContent = pedido.tipoEnvio;

      const columnaDescuentoUsado = document.createElement("td");
      columnaDescuentoUsado.textContent = pedido.codigoUsado;

      const columnaTotalPedido = document.createElement("td");
      columnaTotalPedido.textContent = `${pedido.total.toFixed(2)} €`;

      const columnaListaArticulos = document.createElement("td");
      const listaArticulos = pedido.articulos
        .map((articulo) => `${articulo.nombre} (${articulo.cantidad}x)`)
        .join(", ");
      columnaListaArticulos.textContent = listaArticulos;

      fila.appendChild(columnaNumeroPedido);
      fila.appendChild(columnaFechaPedido);
      fila.appendChild(columnaTipoEnvio);
      fila.appendChild(columnaDescuentoUsado);
      fila.appendChild(columnaTotalPedido);
      fila.appendChild(columnaListaArticulos);

      tablaPedidosBody.appendChild(fila);
    }
  });

  if (!seEncontroPedido) {
    seccionPedidosRecientes.style.display = "none";
  }

  const cerrarSesionBtn = document.getElementById("cerrar-sesion-btn");

  // Esta parte sirver como intento de cierre de sesion, que aqui seria eliminando los datosUsuario del localStorage
  cerrarSesionBtn.addEventListener("click", function () {
    localStorage.removeItem("datosUsuario");
    location.reload();
  });

  // A partir de aqui es comun para todos los codigos pero lo queria añadir
  const searchInput = document.getElementById("input-buscar");

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
    const carrito =
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`)) || [];

    const productoExistenteIndex = carrito.findIndex(
      (item) => item.id === producto.idProducto
    );

    if (productoExistenteIndex !== -1) {
      const carritoActualizado = [...carrito];
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
    const carrito =
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
    let carrito =
      datosUsuario && datosUsuario.correoUsuario
        ? JSON.parse(
            localStorage.getItem(`carrito${datosUsuario.correoUsuario}`)
          ) || []
        : JSON.parse(localStorage.getItem(`carrito`));

    const index = carrito.findIndex((item) => item.id === id);

    if (index !== -1) {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }

      localStorage.setItem(
        `carrito${
          datosUsuario && datosUsuario.correoUsuario
            ? datosUsuario.correoUsuario
            : ""
        }`,
        JSON.stringify(carrito)
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
});
