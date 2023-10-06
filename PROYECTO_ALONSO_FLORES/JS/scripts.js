/* document.addEventListener("DOMContentLoaded", function () {
  // Obtén el icono de usuario y el desplegable
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
  });
});
 */
