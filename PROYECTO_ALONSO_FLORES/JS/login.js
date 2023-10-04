document.addEventListener("DOMContentLoaded", function () {
  // Obtén los elementos de los formularios y el enlace
  var registerForm = document.querySelector(".register-form");
  var loginForm = document.querySelector(".login-form");
  var messageLink = document.querySelector(".message a");

  // Agrega un evento de clic al enlace
  messageLink.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace haga clic en su comportamiento predeterminado
    toggleForms();
  });

  // Función para alternar la visibilidad de los formularios
  function toggleForms() {
    if (registerForm.style.display === "block") {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    } else {
      registerForm.style.display = "block";
      loginForm.style.display = "none";
    }
  }

  // Llama a la función para mostrar uno de los formularios al cargar la página
  toggleForms();
});
