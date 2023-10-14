document.addEventListener("DOMContentLoaded", function () {
  /* // Obtén el icono de usuario y el desplegable
  const userIcon = document.getElementById("user-icon");
  const userDropdown = document.getElementById("user-dropdown");

  // Agrega un evento de clic al icono de usuario
  userIcon.addEventListener("click", function () {
    // Alternar la visibilidad del desplegable al hacer clic
    userDropdown.classList.toggle("show");
  });

  // Cierra el desplegable si se hace clic en cualquier otro lugar de la página
  window.addEventListener("click", function (event) {
    if (
      !userIcon.contains(event.target) &&
      !userDropdown.contains(event.target)
    ) {
      userDropdown.classList.remove("show");
    }
  }); */

  var listaJuegosMesa = [];

  function cargarJuegosMesa() {
    $.getJSON("../JSON/productoJSON.json", function (datos) {
      listaJuegosMesa = datos;
      ordenarPorDescuento(listaJuegosMesa);
      mostrarJuegosMesa(listaJuegosMesa);
      ordenarPorFecha(listaJuegosMesa);
      mostrarJuegosMesa(listaJuegosMesa);
      ordenarPorNota(listaJuegosMesa);
      mostrarJuegosMesa(listaJuegosMesa);
    });
  }

  cargarJuegosMesa();

  // Función para crear el HTML de un producto
  function mostrarJuegosMesa(lista) {
    const productGrid = document.querySelector(".product-grid");

    lista.forEach((producto, index) => {
      if (index >= 5) {
        return; // Sal del bucle si se han procesado 5 elementos
      }

      // Crea un nuevo juego destacado
      const juegoDestacado = document.createElement("div");
      juegoDestacado.className = "juego-destacado";

      if (producto.descuento) {
        // Calcula el precio con descuento
        valorDescuento = (producto.precio * producto.porcentajeDescuento) / 100;
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
