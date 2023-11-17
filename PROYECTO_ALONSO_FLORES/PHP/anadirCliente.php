<?php
$rutaJSON = '../JSON/clienteJSON.json';

$nombre = $_POST['register-nombre'];
$correo = $_POST['register-correo'];
$contrasena = $_POST['register-contrasena'];

$clientes = json_decode(file_get_contents($rutaJSON), true);

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

$nuevoCliente = array(
    'idCliente' => count($clientes) + 1,
    'nombre' => $nombre,
    'apellidos' => "",
    'direccion' => "",
    'correo' => $correo,
    'telefono' => "",
    'contrasena' => $contrasena
);

$clientes[] = $nuevoCliente;

file_put_contents($rutaJSON, json_encode($clientes));

header('Location: ../HTML/index.html?correo=' . $correo);
exit;
?>
