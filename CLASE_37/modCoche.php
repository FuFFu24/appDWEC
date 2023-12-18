<?php
require("acceso_mysql2.php");
$_POST = json_decode(file_get_contents('php://input'),true);

if (isset($_POST["matricula"])) {
    $matricula = $_POST["matricula"];
    $stmt = $dbh->prepare("SELECT * FROM coches where matricula = ?");
    $stmt->execute([$matricula]);

    if ($stmt->fetch()) {
        if (isset($_POST["marca"]) &&
        isset($_POST["modelo"]) &&
        isset($_POST["cilindrada"]) && 
        isset($_POST["fecha"]) && 
        isset($_POST["foto"])) {

            error_log(print_r("MODIFICADO COCHE CON MATRICULA" . $matricula,true));

            $marca = htmlspecialchars($_POST["marca"]);
            $modelo = htmlspecialchars($_POST["modelo"]);
            $cilindrada = htmlspecialchars($_POST["cilindrada"]);
            $fecha = htmlspecialchars($_POST["fecha"]);
            $foto = htmlspecialchars($_POST["foto"]);

            $stmt = $dbh->prepare("UPDATE coches SET marca = ?, modelo = ?, cilindrada = ?, fecha = ?, foto = ? WHERE matricula = ?");
            $stmt->execute([$marca, $modelo, $cilindrada, $fecha, $foto, $matricula]);

            if ($stmt->rowCount()==0) {
                echo '{"estado":"error","mensaje":"matricula no existente"}';
            } else {
                echo '{"estado":"ok"}';
            }
        } else {
            echo '{"estado":"error","mensaje":"faltan datos"}';
        }
    } else {
        echo '{"estado":"error","mensaje":"matricula existente"}';
    }
} else {
    echo '{"estado":"error","mensaje":"falta matricula"}';
}

?>