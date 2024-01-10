<?php
  //Configuracion de la conexion a base de datos
  $bd_host = "192.168.138.250";
  $bd_usuario = "user";
  $bd_password = "password";
  $bd_base = "kartBBDD";
  $bd_port = "33060";

  try {
    $dsn = "mysql:host=$bd_host:$bd_port;dbname=$bd_base";
    $dbh = new PDO($dsn, $bd_usuario, $bd_password);
} catch (PDOException $e){
    echo $e->getMessage();
}
?>