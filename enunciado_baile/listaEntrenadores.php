<?php

require("acceso_mysql.php");

$dato=$_POST["TURNO"];

$resultado=mysqli_query($con,"SELECT DISTINCT curso_cod_entrenador,curso_entrenador FROM cursos_de_baile WHERE CURSO_HORARIO='".$dato."'");
while ($entrenador=mysqli_fetch_array($resultado)) {
        echo $entrenador[0]  . "/" . $entrenador[1] . ";";
}

?>