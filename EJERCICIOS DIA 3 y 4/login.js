// Función para manejar el envío del formulario
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    // Obtener los valores del usuario y la clave
    var usuario = document.getElementById("usuario").value;
    var clave = document.getElementById("clave").value;

    // Comprobar las credenciales
    if (usuario === "root" && clave === "1234") {
        // Credenciales válidas, redirigir a la página aterrizaje.html
        window.location.href = "aterrizaje.html";
    } else {
        // Credenciales incorrectas, mostrar mensaje de error y aplicar estilo de borde rojo
        document.getElementById("mensajeError").textContent = "Usuario y/o clave incorrecta.";
        document.getElementById("usuario").classList.add("error");
        document.getElementById("clave").classList.add("error");
    }
});