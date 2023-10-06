document.addEventListener("DOMContentLoaded", function () {
  // Obtén los elementos del formulario de registro, formulario de inicio de sesión y el enlace de mensaje
  var registerForm = document.querySelector(".register-form");
  var loginForm = document.querySelector(".login-form");
  var messageLinkRegister = document.querySelector(".message-register a");
  var messageLinkLogin = document.querySelector(".message-login a");

  // Agrega un evento de clic al enlace de mensaje
  messageLinkRegister.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace realice su comportamiento predeterminado
    toggleForms(); // Llama a la función para alternar entre los formularios
  });

  // Agrega un evento de clic al enlace de mensaje
  messageLinkLogin.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace realice su comportamiento predeterminado
    toggleForms(); // Llama a la función para alternar entre los formularios
  });

  // Función para alternar la visibilidad de los formularios
  function toggleForms() {
    if (registerForm.style.display === "block") {
      // Si el formulario de registro se muestra, ocúltalo y muestra el formulario de inicio de sesión
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    } else {
      // Si el formulario de inicio de sesión se muestra, ocúltalo y muestra el formulario de registro
      registerForm.style.display = "block";
      loginForm.style.display = "none";
    }
  }

  // Llama a la función para mostrar uno de los formularios al cargar la página
  toggleForms();
});
