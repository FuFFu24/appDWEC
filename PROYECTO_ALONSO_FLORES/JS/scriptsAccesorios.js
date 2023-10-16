document.addEventListener("DOMContentLoaded", function () {
  var listaAccesorios = [];
  var accesoriosPorPagina = 12; // Cantidad predeterminada de accesorios por página
  var paginaActual = 1;

  const selectOrdenar = document.getElementById("filtrar-ordenar");
  const productosPorPage = document.getElementById("productosPorPage");

  // Función para crear el HTML de un producto
  function mostrarAccesorios(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = `
      <div class="product-grid"></div>
    `;
    const productGrid = document.querySelector(".product-grid");

    lista.forEach((producto) => {
      // Crea un nuevo accesorio destacado
      const accesorioDestacado = document.createElement("div");
      accesorioDestacado.className = "accesorio-destacado";

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

  function ordenaraccesorios(criterio) {
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

  function actualizarVista() {
    mostrarAccesorios(
      listaAccesorios.slice(
        (paginaActual - 1) * accesoriosPorPagina,
        paginaActual * accesoriosPorPagina
      )
    );
  }

  selectOrdenar.addEventListener("change", function () {
    const opcionSeleccionada = selectOrdenar.value;
    ordenaraccesorios(opcionSeleccionada);
    paginaActual = 1;
    actualizarVista();
    actualizarSelectorPagina();
  });

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
      botonPaginaAnterior.innerHTML =
        '<img src="../IMG/LOGOS/left-arrow-gris.png" alt="">';
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
      botonPaginaSiguiente.innerHTML =
        '<img src="../IMG/LOGOS/right-arrow-gris.png" alt="">';
      botonPaginaSiguiente.addEventListener("click", function () {
        paginaActual++;
        actualizarVista();
        actualizarSelectorPagina();
      });
      selectorPagina.appendChild(botonPaginaSiguiente);
    }
  }

  function cargarYMostrarAccesorios() {
    $.getJSON("../JSON/accesorioJSON.json", function (datos) {
      listaAccesorios = datos;
      ordenaraccesorios("masVendidos"); // Ordena inicialmente por más vendidos
      actualizarVista();
      actualizarSelectorPagina();
    });
  }

  cargarYMostrarAccesorios();

  // Obtiene las imágenes de flecha izquierda y derecha
  const imgFlechaIzquierda = document.querySelector(".page-anterior img");
  const imgFlechaDerecha = document.querySelector(".page-siguiente img");

  // Cuando se realiza un hover en la flecha izquierda
  imgFlechaIzquierda.addEventListener("mouseover", function () {
    imgFlechaIzquierda.src = "../IMG/LOGOS/left-arrow-verde.png";
  });

  // Cuando se quita el hover de la flecha izquierda
  imgFlechaIzquierda.addEventListener("mouseout", function () {
    imgFlechaIzquierda.src = "../IMG/LOGOS/left-arrow-gris.png";
  });

  // Cuando se realiza un hover en la flecha derecha
  imgFlechaDerecha.addEventListener("mouseover", function () {
    imgFlechaDerecha.src = "../IMG/LOGOS/right-arrow-verde.png";
  });

  // Cuando se quita el hover de la flecha derecha
  imgFlechaDerecha.addEventListener("mouseout", function () {
    imgFlechaDerecha.src = "../IMG/LOGOS/right-arrow-gris.png";
  });
});
