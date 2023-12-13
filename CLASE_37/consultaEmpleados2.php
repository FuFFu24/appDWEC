<?php
require("acceso_mysql2.php");
$stmt = $dbh->prepare("SELECT * FROM empleados");
$stmt->setFetchMode(PDO::FETCH_ASSOC);
$stmt->execute();
while ($empleado=$stmt->fetch()) {
        $arrayEmpleados[] = array_map('utf8_encode', $empleado);
}
//enviamos el array como objeto JSON
echo json_encode($arrayEmpleados);

?>