document.addEventListener("DOMContentLoaded", function () {
  // Obtén los elementos del formulario de registro, formulario de inicio de sesión y los enlaces de mensaje
  var registerForm = document.querySelector(".register-form");
  var loginForm = document.querySelector(".login-form");
  var messageLinkRegister = document.querySelector(".message-register a");
  var messageLinkLogin = document.querySelector(".message-login a");

  // Agrega un evento de clic a los enlaces de mensaje para alternar entre los formularios
  messageLinkRegister.addEventListener("click", toggleForms);
  messageLinkLogin.addEventListener("click", toggleForms);

  // Función para alternar la visibilidad de los formularios
  function toggleForms(event) {
    event.preventDefault(); // Evita que el enlace realice su comportamiento predeterminado

    // Comprueba si el formulario de registro está visible
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
  toggleForms(new Event("click"));
});
