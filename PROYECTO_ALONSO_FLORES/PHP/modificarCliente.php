<?php
// Ruta al archivo JSON de clientes
$rutaJSON = '../JSON/clienteJSON.json';

// Obtén los datos del cliente desde la solicitud POST
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$direccion = $_POST['direccion'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$contrasenaActual = $_POST['contrasenaActual'];
$nuevaContrasena = $_POST['nuevaContrasena'];
$confirmarContrasena = $_POST['confirmarContrasena'];

// Lee el contenido actual del archivo JSON
$clientes = json_decode(file_get_contents($rutaJSON), true);

// Busca el cliente correspondiente al correo
$clienteIndex = array_search($correo, array_column($clientes, 'correo'));

// Verifica si el cliente existe
if ($clienteIndex !== false) {

    if (isset($_POST['guardarDatos'])) {
        $clientes[$clienteIndex]['nombre'] = $nombre;
        $clientes[$clienteIndex]['apellidos'] = $apellidos;
        $clientes[$clienteIndex]['direccion'] = $direccion;
        $clientes[$clienteIndex]['telefono'] = $telefono;
    }
    
    if (isset($_POST['guardarContrasena'])) {
        // Compara la contraseña actual del formulario con la almacenada en el JSON
    if ($clientes[$clienteIndex]['contrasena'] === $contrasenaActual) {
        // Actualiza la contraseña si se proporciona una nueva y coincide con la confirmación
        if (!empty($nuevaContrasena) && $nuevaContrasena === $confirmarContrasena) {
            $clientes[$clienteIndex]['contrasena'] = $nuevaContrasena;
        }
    } else {
        // Contraseña incorrecta
        header('Location: ../HTML/cuenta.html?error=contrasena_incorrecta');
        exit;
    }
    }
    
    // Guarda los cambios en el archivo JSON
    file_put_contents($rutaJSON, json_encode($clientes));

    header('Location: ../HTML/cuenta.html?exito=datos_modificados');
    exit;
} else {
    header('Location: ../HTML/cuenta.html?error=cliente_no_encontrado');
    exit;
}
?>
