<?php

require("acceso_mysql.php");

$dato=$_POST["TURNO"];

$resultado=mysqli_query($con,"SELECT DISTINCT curso_cod_entrenador,curso_entrenador FROM CURSOS_DE_BAILE WHERE CURSO_HORARIO='".$dato."'");
while ($entrenador=mysqli_fetch_array($resultado)) {
        echo $entrenador[0]  . "/" . $entrenador[1] . ";";
}

?>