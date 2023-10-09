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
    $.getJSON("../JSON/productoJSON.txt", function (datos) {
      listaJuegosMesa = datos;
      mostrarJuegosMesa(listaJuegosMesa);
    });
  }

  cargarJuegosMesa();

  // Función para crear el HTML de un producto
  function mostrarJuegosMesa(lista) {
    const destacados = document.querySelector(".destacados");
    destacados.innerHTML = "<table></table>";
    var tbody = destacados.getElementsByTagName("table")[0];
    lista.forEach((producto,index) => {
      if (index % 5 == 0) {
        // Crear una nueva fila de productos
        tbody.innerHTML += `<tr>
        <td>
                <div class="juego-destacado">
                <a href="#" class="web-page">
                <div class="img-juego">
                  <img src="${producto.imagenURL}" alt="${producto.nombre}" />
                </div>
                <div class="datos-juego">
                  <p>${producto.nombre}</p>
                  <h3>${producto.precio} €</h3>
                </div>
              </a>
              <a href="#" class="btn-anadir-carrito">Añadir al carrito</a>
              </div>
            </td>
            </tr>`;
    } else {
      tbody.innerHTML += `
                <td>
                <div class="juego-destacado">
                <a href="#" class="web-page">
                <div class="img-juego">
                  <img src="${producto.imagenURL}" alt="${producto.nombre}" />
                </div>
                <div class="datos-juego">
                  <p>${producto.nombre}</p>
                  <h3>${producto.precio} €</h3>
                </div>
              </a>
              <a href="#" class="btn-anadir-carrito">Añadir al carrito</a>
              </div>
            </td>`;
    }
      
    });

  }
});