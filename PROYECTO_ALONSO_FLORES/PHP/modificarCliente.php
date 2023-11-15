<?php
// Ruta al archivo JSON de clientes
$rutaJSON = '../JSON/clienteJSON.json';

// Obtén los datos del cliente desde la solicitud POST
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$direccion = $_POST['direccion'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$telefcontrasenaActualono = $_POST['contrasenaActual'];
$nuevaContrasena = $_POST['nuevaContrasena'];
$confirmarContrasena = $_POST['confirmarContrasena'];

// Lee el contenido actual del archivo JSON
$clientes = json_decode(file_get_contents($rutaJSON), true);

// Verifica si el correo ya está registrado
$clienteExistente = array_filter($clientes, function($cliente) use ($correo) {
    return $cliente['correo'] === $correo;
});

if (!empty($clienteExistente)) {
    header('Location: ../HTML/login.html?error=correo_existente');
    exit;
} else if (empty($nombre) || empty($correo) || empty($contrasena)) {
    header('Location: ../HTML/login.html?vacio=campos_vacios');
    exit;
}

// Crea un nuevo cliente
$nuevoCliente = array(
    'idCliente' => count($clientes) + 1, // Asigna un nuevo ID único
    'nombre' => $nombre,
    'apellidos' => "",
    'direccion' => "",
    'correo' => $correo,
    'telefono' => "",
    'contrasena' => $contrasena
);

// Agrega el nuevo cliente al array existente
$clientes[] = $nuevoCliente;

// Escribe el contenido actualizado al archivo JSON
file_put_contents($rutaJSON, json_encode($clientes));

// Redirige a la página de inicio con el correo como parámetro
header('Location: ../HTML/index.html?nombre=' . $nombre . '&correo=' . $correo);
exit;
?>
