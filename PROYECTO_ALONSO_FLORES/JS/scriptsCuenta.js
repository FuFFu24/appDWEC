document.addEventListener("DOMContentLoaded", function () {
  // Array en el que vamos a guardar todos los datos del JSON
  let listaClientes = [];
  let listaJuegosMesa = [];

  // Con esta función cargaremos los datos del JSON en la lista de juegos de mesa y también mostraremos los datos en la página
  function cargarDatosClientes() {
    $.getJSON("../JSON/clienteJSON.json", function (datos) {
      listaClientes = datos;
      mostrarDatosUsuario();
    });
  }

  cargarDatosClientes();

  // Con esta funcion cargaremos los datos del JSON en la lista de juegos mesa y tambien mostraremos los datos en la pagina
  function cargarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;
      mostrarCarrito();
    });
  }

  cargarJuegosMesa();

  function mostrarDatosUsuario() {
    // Obtener datos del localStorage después de cargar los datos del JSON
    const datosUsuarioString = localStorage.getItem("datosUsuario");
    const datosUsuario = datosUsuarioString
      ? JSON.parse(datosUsuarioString)
      : null;

    const datosUsuarioDiv = document.getElementById("datos-usuario");
    const iconoUsuario = document.querySelector(".icono-usuario a");

    if (datosUsuario) {
      // Obtener el correo del usuario desde los datos de localStorage
      const correoUsuario = datosUsuario.correoUsuario;

      // Buscar al usuario en la lista de clientes
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
      } else {
        alert("¿Todavía no tienes cuenta? Crea una cuenta o inicia sesión.");
      }
    }
  }

  const linkEditarDatos = document.getElementById("editarNombre");
  const linkEditarContrasena = document.getElementById("cambiarContrasena");
  const seccionEditarDatos = document.querySelector(".editar-cuenta");
  const seccionEditarContrasena = document.querySelector(".editar-contrasena");

  linkEditarDatos.addEventListener("click", function() {
    seccionEditarDatos.style.display = seccionEditarDatos.style.display === "block" ? "none" : "block";
  });

  linkEditarContrasena.addEventListener("click", function() {
    seccionEditarContrasena.style.display = seccionEditarContrasena.style.display === "block" ? "none" : "block";
  });

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
  } // Evento para buscar juegos de mesa en la lista desde un input con keyup
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
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistenteIndex = carrito.findIndex(
      (item) => item.id === producto.idProducto
    );

    if (productoExistenteIndex !== -1) {
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
