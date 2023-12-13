<?php
require("acceso_mysql.php");
$resultado=mysqli_query($con,"SELECT * FROM empleados");
$arrayEmpleados = array();
while ($empleado=mysqli_fetch_assoc($resultado)) {
        $arrayEmpleados[] = array_map('utf8_encode', $empleado);
}
//enviamos el array como objeto JSON
echo json_encode($arrayEmpleados);

?>