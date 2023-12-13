<?php
require("acceso_mysql2.php");
$stmt = $dbh->prepare("SELECT * FROM coches");
$stmt->setFetchMode(PDO::FETCH_ASSOC);
$stmt->execute();
while ($coche=$stmt->fetch()) {
        $arrayCoches[] = array_map('utf8_encode', $coche);
}
//enviamos el array como objeto JSON
echo json_encode($arrayCoches);

?>