function buscarProductos(consulta, listaProductos) {
  consulta = consulta.toLowerCase();
  return listaProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(consulta)
  );
}

document.addEventListener("DOMContentLoaded", function () {
  // Recupera la consulta de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  var juegosPorPagina = 12; // Cantidad predeterminada de juegos por página
  var paginaActual = 1;

  const selectOrdenar = document.getElementById("filtrar-ordenar");
  const productosPorPage = document.getElementById("productosPorPage");

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
        const listaProductos = [...productos, ...accesorios];

        // Llama a la función buscarProductos con la lista combinada
        const resultados = buscarProductos(query, listaProductos);

        if (resultados.length > 0) {
          mostrarResultados(resultados);
        } else {
          const resultadosDiv = document.querySelector(".resultados-busqueda");
          resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        }
      })
      .catch((error) => {
        console.error("Error al cargar la lista de productos: " + error);
      });
  }

  function mostrarResultados(resultados) {
    const resultadosDiv = document.querySelector(".resultados-busqueda");
    resultadosDiv.innerHTML = `
    <div class="product-grid"></div>
  `;
    const productGrid = document.querySelector(".product-grid");

    if (resultados.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
    } else {
      resultados.forEach((producto) => {
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
});
