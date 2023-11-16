<?php
// Ruta al archivo JSON de clientes
$rutaJSON = '../JSON/clienteJSON.json';

// Obtén los datos del cliente desde la solicitud POST
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

// Lee el contenido actual del archivo JSON
$clientes = json_decode(file_get_contents($rutaJSON), true);

// Busca el cliente correspondiente al correo
$clienteIndexDatos = array_search($correoAntiguo, array_column($clientes, 'correo'));
$clienteIndexContrasena = array_search($correo, array_column($clientes, 'correo'));

// Verifica si el cliente existe
if (isset($_POST['guardarDatos'])) {
    // Verifica el correo actual antes de realizar modificaciones
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
    // Verifica el correo actual antes de realizar modificaciones
    if ($clienteIndexContrasena !== false) {
        if ($clientes[$clienteIndexContrasena]['correo'] !== $correo) {
            header('Location: ../HTML/cuenta.html?error=correo_no_coincide_contrasena');
            exit;
        }

        // Compara la contraseña actual del formulario con la almacenada en el JSON
        if ($clientes[$clienteIndexContrasena]['contrasena'] === $contrasenaActual) {
            // Actualiza la contraseña si se proporciona una nueva y coincide con la confirmación
            if (!empty($nuevaContrasena) && $nuevaContrasena === $confirmarContrasena) {
                $clientes[$clienteIndexContrasena]['contrasena'] = $nuevaContrasena;
            } else {
                // Contraseña incorrecta
                header('Location: ../HTML/cuenta.html?error=contrasena_incorrecta');
                exit;
            }
        } else {
            // Contraseña incorrecta
            header('Location: ../HTML/cuenta.html?error=contrasena_incorrecta');
            exit;
        }
    } else {
        header('Location: ../HTML/cuenta.html?error=cliente_no_encontrado_contrasena');
        exit;
    }
}

// Guarda los cambios en el archivo JSON
file_put_contents($rutaJSON, json_encode($clientes));

// Obtén los datos actualizados del cliente
if ($clienteIndexDatos !== false) {
    $clienteActualizado = $clientes[$clienteIndexDatos];

    // Convierte los datos en una cadena JSON
    $datosUsuarioActualizados = json_encode([
        'nombreUsuario' => $clienteActualizado['nombre'],
        'apellidoUsuario' => $clienteActualizado['apellidos'],
        'direccionUsuario' => $clienteActualizado['direccion'],
        'correoUsuario' => $clienteActualizado['correo'],
        'telefonoUsuario' => $clienteActualizado['telefono']
    ]);
} else {
    $clienteActualizado = $clientes[$clienteIndexContrasena];

    // Convierte los datos en una cadena JSON
    $datosUsuarioActualizados = json_encode([
        'nombreUsuario' => $clienteActualizado['nombre'],
        'apellidoUsuario' => $clienteActualizado['apellidos'],
        'direccionUsuario' => $clienteActualizado['direccion'],
        'correoUsuario' => $clienteActualizado['correo'],
        'telefonoUsuario' => $clienteActualizado['telefono']
    ]);
}


// Almacena la cadena JSON en el localStorage
echo "<script>
        localStorage.setItem('datosUsuario', '$datosUsuarioActualizados');
        window.location.href = '../HTML/cuenta.html?exito=datos_modificados';
      </script>";
exit;
?>
