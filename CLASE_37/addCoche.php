<?php
require("acceso_mysql2.php");

if (isset($_POST["matricula"])) {
    $matricula = $_POST["matricula"];
    $stmt = $dbh->prepare("SELECT * FROM coches where matricula = ?");
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $stmt->execute([$matricula]);

    if ($stmt->fetch()) {
        echo '{"estado":"error","mensaje":"matricula existente"}';
    } else {
        if (isset($_POST["marca"]) &&
        isset($_POST["modelo"]) &&
        isset($_POST["cilindrada"]) && 
        isset($_POST["fecha"]) && 
        isset($_POST["foto"])) {
            $marca = $_POST["marca"];
            $modelo = $_POST["modelo"];
            $cilindrada = $_POST["cilindrada"];
            $fecha = $_POST["fecha"];
            $foto = $_POST["foto"];

            $stmt = $dbh->prepare("INSERT INTO coches (matricula, marca, modelo, cilindrada, fecha, foto) VALUES (?,?,?,?,?,?)");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute([$matricula, $marca, $modelo, $cilindrada, $fecha, $foto]);

            if ($stmt->rowCount()==0) {
                echo '{"estado":"error","mensaje":"matricula existente"}';
            } else {
                echo '{"estado":"ok"}';
            }
        } else {
            echo '{"estado":"error","mensaje":"faltan datos"}';
        }
    }
} else {
    echo '{"estado":"error","mensaje":"falta matricula"}';
}

$stmt = $dbh->prepare("SELECT * FROM coches");
$stmt->setFetchMode(PDO::FETCH_ASSOC);
$stmt->execute();



while ($coche=$stmt->fetch()) {
        $arrayCoches[] = array_map('utf8_encode', $coche);
}
//enviamos el array como objeto JSON
echo json_encode($arrayCoches);

?>