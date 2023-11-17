  // Array en el que vamos a guardar todos los datos del JSON
  let listaUsuarios = [];

  function cargarUsuarios() {
    $.getJSON("../JSON/clienteJSON.json", function (datos) {
      listaUsuarios = datos;
    });
  }

  cargarUsuarios();
  
  document.addEventListener("DOMContentLoaded", function () {

  // Recoger datos de la URL, donde se envian los errores producidos
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");
  const vacio = urlParams.get("vacio");

  // Verifica si hay un error de correo existente o de campos vacios y muestra el mensaje correspondiente
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

  // Esta parte es para cambiar entre crear cuenta y hacer login pulsando el link correspondiente
  var registerForm = document.querySelector(".register-form");
  var loginForm = document.querySelector(".login-form");
  var mensajeLinkRegister = document.querySelector(".message-register a");
  var mensajeLinkLogin = document.querySelector(".message-login a");

  // Agrega un evento de clic a los enlaces de mensaje para alternar entre los formularios
  mensajeLinkRegister.addEventListener("click", cambiarFormulario);
  mensajeLinkLogin.addEventListener("click", cambiarFormulario);

  function cambiarFormulario(event) {
    event.preventDefault();

    if (registerForm.style.display === "block") {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    } else {
      registerForm.style.display = "block";
      loginForm.style.display = "none";
    }
  }

  cambiarFormulario(new Event("click"));
});

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
      idUsuario: usuario.id,
      nombreUsuario: usuario.nombre,
      apellidoUsuario: usuario.apellidos,
      direccionUsuario: usuario.direccion,
      correoUsuario: usuario.correo,
      telefonoUsuario: usuario.telefono,
    };

    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

    window.location.href = `../HTML/index.html`;
  } else {
    mensajeError.style.display = "block";
  }
}
