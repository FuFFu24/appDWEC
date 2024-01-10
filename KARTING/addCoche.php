<?php
require("acceso_karting.php");
#$_POST = json_decode(file_get_contents('php://input'),true);

if (isset($_POST["modelo"]) && isset($_POST["color"])) {

    $modelo = htmlspecialchars($_POST["modelo"]);
    $color = htmlspecialchars($_POST["color"]);

    if (empty($modelo) || empty($color)) {
        echo '{"estado":"error","mensaje":"faltan datos"}';
    } else {
        $stmt = $dbh->prepare("INSERT INTO Coches (Modelo, Color) VALUES (?,?)");
        $stmt->execute([$modelo, $color]);

        if ($stmt->rowCount()!=0) {
            echo '{"estado":"ok"}';
        } else {
            echo '{"estado":"error","mensaje":"error"}';
        }
    }
} else {
    echo '{"estado":"error","mensaje":"faltan datos"}';
}

?>