<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['registrarse'])) {
        $rutaJSON = '../JSON/clienteJSON.json';

        $nombre = isset($_POST['register-nombre']) ? htmlspecialchars(trim(strip_tags($_POST['register-nombre'])),ENT_QUOTES,"utf-8") : '';
        $correo = isset($_POST['register-correo']) ? htmlspecialchars(trim(strip_tags($_POST['register-correo'])),ENT_QUOTES,"utf-8") : '';
        $contrasena = isset($_POST['register-contrasena']) ? htmlspecialchars(trim(strip_tags($_POST['register-contrasena'])),ENT_QUOTES,"utf-8") : '';

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
    }
}
?>
