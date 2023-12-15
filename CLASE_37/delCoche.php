<?php
require("acceso_mysql2.php");

if (isset($_POST["matricula"])) {
    $matricula = $_POST["matricula"];

    $stmt = $dbh->prepare("DELETE FROM coches WHERE matricula = ?");
    $stmt->execute([$matricula]);

    if ($stmt->rowCount()==0) {
        echo '{"estado":"error","mensaje":"no se ha podido eliminar"}';
    } else {
        echo '{"estado":"ok"}';
    }
} else {
    echo '{"estado":"error","mensaje":"falta matricula"}';
}

?>