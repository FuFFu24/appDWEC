<?php 
//Configuracion de la conexion a base de datos 
$bd_usuario="user"; 
$bd_password="password"; 
try{ 
   $dsn="mysql:host=192.168.138.250;port=33060;dbname=kartBBDD"; 
   $dbh=new PDO($dsn,$bd_usuario,$bd_password); 
   $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
} catch(PDOException $e){ 
   echo $e->getMessage(); } 
?>
