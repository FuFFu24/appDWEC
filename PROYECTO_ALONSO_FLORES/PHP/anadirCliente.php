<?php
// Ruta al archivo JSON de clientes
$rutaJSON = '../JSON/clienteJSON.json';

// Obtén los datos del cliente desde la solicitud POST
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$direccion = $_POST['direccion'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$contraseña = $_POST['contrasena'];

// Lee el contenido actual del archivo JSON
$clientes = json_decode(file_get_contents($rutaJSON), true);

// Crea un nuevo cliente
$nuevoCliente = array(
    'idCliente' => count($clientes) + 1, // Asigna un nuevo ID único
    'nombre' => $nombre,
    'apellidos' => $apellidos,
    'direccion' => $direccion,
    'correo' => $correo,
    'telefono' => $telefono,
    'contraseña' => $contraseña
);

// Agrega el nuevo cliente al array existente
$clientes[] = $nuevoCliente;

// Escribe el contenido actualizado al archivo JSON
file_put_contents($rutaJSON, json_encode($clientes));

// Envía una respuesta de éxito (puedes personalizar según tus necesidades)
echo json_encode(array('mensaje' => 'Cliente registrado exitosamente'));
?>
