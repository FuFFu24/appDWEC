document.addEventListener("DOMContentLoaded", function () {
  // Obtén el parámetro 'error' de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");
  const vacio = urlParams.get("vacio");

  // Verifica si hay un error de 'correo_existente' y muestra el mensaje correspondiente
  const mensajeError = document.getElementById("correo-existente");
  if (error === "correo_existente") {
    mensajeError.style.display = "block";
  } else {
    mensajeError.style.display = "none";
  }

  const mensajeVacio = document.getElementById("campos-vacios");
  if (vacio === "campos_vacios") {
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }

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

// Array en el que vamos a guardar todos los datos del JSON
let listaUsuarios = [];

// Función para cargar los usuarios desde el JSON
function cargarUsuarios() {
  $.getJSON("../JSON/clienteJSON.json", function (datos) {
    listaUsuarios = datos;
  });
}

cargarUsuarios();

// Función para realizar el inicio de sesión
function iniciarSesion() {
  const email = document.getElementById("login-correo").value;
  const password = document.getElementById("login-contrasena").value;

  const usuario = listaUsuarios.find(
    (user) => user.correo === email && user.contrasena === password
  );

  const mensajeError = document.getElementById("login-error");
  mensajeError.style.display = "none";

  if (usuario) {
    const datosUsuario = {
      nombreUsuario: usuario.nombre,
      correoUsuario: usuario.correo,
    };

    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

    window.location.href = `../HTML/index.html`;
  } else {
    mensajeError.style.display = "block";
  }
}
