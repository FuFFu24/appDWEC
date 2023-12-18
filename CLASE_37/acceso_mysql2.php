<?php
  //Configuracion de la conexion a base de datos
  $bd_host = $_ENV["BBDD_HOST"];
  $bd_usuario = $_ENV["BBDD_USER"];
  $bd_password = $_ENV["BBDD_PASSWORD"];
  $bd_base = $_ENV["BBDD_DATABASE"];
  $bd_port = $_ENV["BBDD_HOST_PORT"];

  try {
    $dsn = "mysql:host=$bd_host:$bd_port;dbname=$bd_base";
    $dbh = new PDO($dsn, $bd_usuario, $bd_password);
} catch (PDOException $e){
    echo $e->getMessage();
}
?>