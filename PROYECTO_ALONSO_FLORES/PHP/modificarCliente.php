<?php
$rutaJSON = '../JSON/clienteJSON.json';

$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$direccion = $_POST['direccion'];
$correoAntiguo = $_POST['correoAntiguo'];
$correoNuevo = $_POST['correoNuevo'];
$telefono = $_POST['telefono'];

$correo = $_POST['correo'];
$contrasenaActual = $_POST['contrasenaActual'];
$nuevaContrasena = $_POST['nuevaContrasena'];
$confirmarContrasena = $_POST['confirmarContrasena'];

$clientes = json_decode(file_get_contents($rutaJSON), true);

$clienteIndexDatos = array_search($correoAntiguo, array_column($clientes, 'correo'));
$clienteIndexContrasena = array_search($correo, array_column($clientes, 'correo'));

if (isset($_POST['guardarDatos'])) {
    if ($clienteIndexDatos !== false) {
        if ($clientes[$clienteIndexDatos]['correo'] !== $correoAntiguo) {
            header('Location: ../HTML/cuenta.html?error=correo_no_coincide_datos');
            exit;
        }

        $clientes[$clienteIndexDatos]['nombre'] = $nombre;
        $clientes[$clienteIndexDatos]['apellidos'] = $apellidos;
        $clientes[$clienteIndexDatos]['direccion'] = $direccion;

        if (!empty($correoNuevo)) {
            $clientes[$clienteIndexDatos]['correo'] = $correoNuevo;
        } else {
            $clientes[$clienteIndexDatos]['correo'] = $correoAntiguo;
        }

        $clientes[$clienteIndexDatos]['telefono'] = $telefono;

    } else {
        header('Location: ../HTML/cuenta.html?error=cliente_no_encontrado_datos');
        exit;
    }
}

if (isset($_POST['guardarContrasena'])) {
    if ($clienteIndexContrasena !== false) {
        if ($clientes[$clienteIndexContrasena]['correo'] !== $correo) {
            header('Location: ../HTML/cuenta.html?error=correo_no_coincide_contrasena');
            exit;
        }

        if ($clientes[$clienteIndexContrasena]['contrasena'] === $contrasenaActual) {
            if (!empty($nuevaContrasena) && $nuevaContrasena === $confirmarContrasena) {
                $clientes[$clienteIndexContrasena]['contrasena'] = $nuevaContrasena;
            } else {
                header('Location: ../HTML/cuenta.html?error=contrasena_incorrecta');
                exit;
            }
        } else {
            header('Location: ../HTML/cuenta.html?error=contrasena_incorrecta');
            exit;
        }
    } else {
        header('Location: ../HTML/cuenta.html?error=cliente_no_encontrado_contrasena');
        exit;
    }
}

file_put_contents($rutaJSON, json_encode($clientes));

if ($clienteIndexDatos !== false) {
    $clienteActualizado = $clientes[$clienteIndexDatos];

    $datosUsuarioActualizados = json_encode([
        'nombreUsuario' => $clienteActualizado['nombre'],
        'apellidoUsuario' => $clienteActualizado['apellidos'],
        'direccionUsuario' => $clienteActualizado['direccion'],
        'correoUsuario' => $clienteActualizado['correo'],
        'telefonoUsuario' => $clienteActualizado['telefono']
    ]);
} else {
    $clienteActualizado = $clientes[$clienteIndexContrasena];

    $datosUsuarioActualizados = json_encode([
        'nombreUsuario' => $clienteActualizado['nombre'],
        'apellidoUsuario' => $clienteActualizado['apellidos'],
        'direccionUsuario' => $clienteActualizado['direccion'],
        'correoUsuario' => $clienteActualizado['correo'],
        'telefonoUsuario' => $clienteActualizado['telefono']
    ]);
}

echo "<script>
        localStorage.setItem('datosUsuario', '$datosUsuarioActualizados');
        window.location.href = '../HTML/cuenta.html?exito=datos_modificados';
      </script>";
exit;
?>
