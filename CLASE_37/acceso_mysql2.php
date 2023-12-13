<?php
  //Configuracion de la conexion a base de datos
  $bd_host = "mysql";
  $bd_usuario = "usuario";
  $bd_password = "1234567";
  $bd_base = "2daw";

  try {
    $dsn = "mysql:host=$bd_host;dbname=$bd_base";
    $dbh = new PDO($dsn, $bd_usuario, $bd_password);
} catch (PDOException $e){
    echo $e->getMessage();
}
?>